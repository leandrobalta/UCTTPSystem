import React, { useState, useEffect } from "react";
import { Add, Edit, Delete, Search } from "@mui/icons-material";
import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useConfirm, useSnackbar } from "../hooks/use-alert-utils";
import { useLoading } from "../hooks/use-loading";
import { InstitutionModel } from "../models/institution.model";
import { InstitutionService } from "../services/institution.service";

export function InstitutionPage() {
  const { confirm } = useConfirm();
  const navigate = useNavigate();
  const { snackbar } = useSnackbar();
  const { setLoading } = useLoading();

  const [institutions, setInstitutions] = useState<InstitutionModel[]>([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState<InstitutionModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [editInstitution, setEditInstitution] = useState<InstitutionModel>({} as InstitutionModel);
  const [institutionToAdd, setInstitutionToAdd] = useState<InstitutionModel>({} as InstitutionModel);

  const handleDialogOpen = () => setAddOpen(true);
  const handleDialogClose = () => setAddOpen(false);

  const handleEditInstitution = (institution: InstitutionModel) => {
    if (institution) {
      setEditInstitution(institution);
      setEditDialog(true);
      handleDialogOpen();
    }
  };

  const fetchInstitutions = async () => {
    setLoading(true);
    const response = await InstitutionService.getAllInstitutions(navigate);

    if (!response.success) {
      snackbar({
        severity: "error",
        message: response.message,
        delay: 5000,
      });
    }

    if (response.data) {
      setInstitutions(response.data);
      setFilteredInstitutions(response.data); // Inicializa com todas as instituições
    }

    setLoading(false);
  };

  const handleSaveInstitution = async () => {
    setLoading(true);
    if (editDialog) {
      const updateResp = await InstitutionService.updateInstitution(
        navigate,
        editInstitution,
        editInstitution.sigla
      );

      snackbar({
        severity: updateResp.success ? "success" : "error",
        message: updateResp.message,
        delay: 5000,
      });

      fetchInstitutions();
    } else {
      const addResp = await InstitutionService.addInstitution(navigate, institutionToAdd);

      snackbar({
        severity: addResp.success ? "success" : "error",
        message: addResp.message,
        delay: 5000,
      });

      fetchInstitutions();
    }
    setLoading(false);
    setAddOpen(false);
    setEditDialog(false);
  };

  const handleDeleteInstitution = async (institution: InstitutionModel) => {
    setLoading(true);
    const deleteResp = await InstitutionService.deleteInstitution(navigate, institution);

    snackbar({
      severity: deleteResp.success ? "success" : "error",
      message: deleteResp.message,
      delay: 5000,
    });

    fetchInstitutions();
    setLoading(false);
  };

  const handleCancel = () => {
    setInstitutionToAdd({} as InstitutionModel);
    setEditInstitution({} as InstitutionModel);
    setEditDialog(false);
    handleDialogClose();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filtrar os dados com base no termo de pesquisa
    const filtered = institutions.filter(
      (institution) =>
        institution.name.toLowerCase().includes(value) || institution.sigla.toLowerCase().includes(value)
    );
    setFilteredInstitutions(filtered);
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 h-full w-full items-start bg-[#f8f6f7]">
      {/* Barra de Pesquisa e Botão Adicionar */}
      <div className="flex w-full justify-between items-center gap-10">
        <TextField
          label="Pesquisar"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={handleDialogOpen}
          className="ml-4"
        >
          Adicionar Instituição
        </Button>
      </div>

      {/* Tabela */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Sigla</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInstitutions.map((institution) => (
              <TableRow key={institution.id}>
                <TableCell>{institution.sigla}</TableCell>
                <TableCell>{institution.name}</TableCell>
                <TableCell>
                  <Button startIcon={<Edit />} onClick={() => handleEditInstitution(institution)} />
                  <Button
                    startIcon={<Delete />}
                    onClick={() =>
                      confirm({
                        title: "Deletar Instituição",
                        description: `Tem certeza que deseja deletar a instituição [${institution.name}]? Essa ação é irreversível.`,
                        handleConfirm: () => handleDeleteInstitution(institution),
                      })
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de Adicionar/Editar */}
      <Dialog open={addOpen} onClose={handleDialogClose}>
        <DialogTitle>{editDialog ? "Editar Instituição" : "Adicionar Instituição"}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <TextField
              label="Sigla"
              variant="outlined"
              value={editDialog ? editInstitution.sigla : institutionToAdd.sigla}
              onChange={(e) =>
                editDialog
                  ? setEditInstitution({ ...editInstitution, sigla: e.target.value })
                  : setInstitutionToAdd({ ...institutionToAdd, sigla: e.target.value })
              }
              disabled={editDialog} // Desabilita edição de Sigla ao atualizar
            />
            <TextField
              label="Nome"
              variant="outlined"
              value={editDialog ? editInstitution.name : institutionToAdd.name}
              onChange={(e) =>
                editDialog
                  ? setEditInstitution({ ...editInstitution, name: e.target.value })
                  : setInstitutionToAdd({ ...institutionToAdd, name: e.target.value })
              }
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="contained" color="warning">
            Cancelar
          </Button>
          <Button onClick={handleSaveInstitution} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
