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
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useConfirm, useSnackbar } from "../hooks/use-alert-utils";
import { useLoading } from "../hooks/use-loading";
import { ProfessorModel } from "../models/professor.model";
import { ProfessorService } from "../services/professor.service";

export function ProfessorsPage() {
    const { confirm } = useConfirm();
    const navigate = useNavigate();
    const { snackbar } = useSnackbar();
    const { setLoading } = useLoading();

    const [professors, setProfessors] = useState<ProfessorModel[]>([]);
    const [filteredProfessors, setFilteredProfessors] = useState<ProfessorModel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [editProfessor, setEditProfessor] = useState<ProfessorModel>({} as ProfessorModel);
    const [professorToAdd, setProfessorToAdd] = useState<ProfessorModel>({} as ProfessorModel);

    const handleDialogOpen = () => setAddOpen(true);
    const handleDialogClose = () => setAddOpen(false);

    const handleEditProfessor = (professor: ProfessorModel) => {
        if (professor) {
            setEditProfessor(professor);
            setEditDialog(true);
            handleDialogOpen();
        }
    };

    const fetchProfessors = async () => {
        setLoading(true);
        const response = await ProfessorService.getAllProfessors(navigate);

        if (!response.success) {
            snackbar({
                severity: "error",
                message: response.message,
                delay: 5000,
            });
        }

        if (response.data) {
            setProfessors(response.data);
            setFilteredProfessors(response.data); // Inicializa com todos os professores
        }

        setLoading(false);
    };

    const handleSaveProfessor = async () => {
        setLoading(true);
        if (editDialog) {
            const updateResp = await ProfessorService.updateProfessor(navigate, editProfessor, editProfessor.registrationNumber);

            snackbar({
                severity: updateResp.success ? "success" : "error",
                message: updateResp.message,
                delay: 5000,
            });

            fetchProfessors();
        } else {
            const addResp = await ProfessorService.addProfessor(navigate, professorToAdd);

            snackbar({
                severity: addResp.success ? "success" : "error",
                message: addResp.message,
                delay: 5000,
            });

            fetchProfessors();
        }
        setLoading(false);
        setAddOpen(false);
        setEditDialog(false);
    };

    const handleDeleteProfessor = async (professor: ProfessorModel) => {
        setLoading(true);
        const deleteResp = await ProfessorService.deleteProfessor(navigate, professor);

        snackbar({
            severity: deleteResp.success ? "success" : "error",
            message: deleteResp.message,
            delay: 5000,
        });

        fetchProfessors();
        setLoading(false);
    };

    const handleCancel = () => {
        setProfessorToAdd({} as ProfessorModel);
        setEditProfessor({} as ProfessorModel);
        setEditDialog(false);
        handleDialogClose();
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        // Filtrar os dados com base no termo de pesquisa
        const filtered = professors.filter((professor) =>
            professor.name.toLowerCase().includes(value) ||
            professor.registrationNumber.toLowerCase().includes(value) ||
            professor.email.toLowerCase().includes(value)
        );
        setFilteredProfessors(filtered);
    };

    useEffect(() => {
        fetchProfessors();
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
                    Adicionar Professor
                </Button>
            </div>

            {/* Tabela */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Matrícula</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Telefone</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Título</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Instituição</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProfessors.map((professor) => (
                            <TableRow key={professor.id}>
                                <TableCell>{professor.registrationNumber}</TableCell>
                                <TableCell>{professor.name}</TableCell>
                                <TableCell>{professor.email}</TableCell>
                                <TableCell>{professor.phone}</TableCell>
                                <TableCell>{professor.title}</TableCell>
                                <TableCell>{professor.institutionFk}</TableCell>
                                <TableCell>
                                    <Button startIcon={<Edit />} onClick={() => handleEditProfessor(professor)} />
                                    <Button
                                        startIcon={<Delete />}
                                        onClick={() =>
                                            confirm({
                                                title: "Deletar Professor",
                                                description: `Tem certeza que deseja deletar o professor [${professor.name}]? Essa ação é irreversível.`,
                                                handleConfirm: () => handleDeleteProfessor(professor),
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
                <DialogTitle>{editDialog ? "Editar Professor" : "Adicionar Professor"}</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4">
                        <TextField
                            label="Matrícula"
                            variant="outlined"
                            value={editDialog ? editProfessor.registrationNumber : professorToAdd.registrationNumber}
                            onChange={(e) =>
                                editDialog
                                    ? setEditProfessor({ ...editProfessor, registrationNumber: e.target.value })
                                    : setProfessorToAdd({ ...professorToAdd, registrationNumber: e.target.value })
                            }
                            disabled={editDialog}
                        />
                        <TextField
                            label="Nome"
                            variant="outlined"
                            value={editDialog ? editProfessor.name : professorToAdd.name}
                            onChange={(e) =>
                                editDialog
                                    ? setEditProfessor({ ...editProfessor, name: e.target.value })
                                    : setProfessorToAdd({ ...professorToAdd, name: e.target.value })
                            }
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={editDialog ? editProfessor.email : professorToAdd.email}
                            onChange={(e) =>
                                editDialog
                                    ? setEditProfessor({ ...editProfessor, email: e.target.value })
                                    : setProfessorToAdd({ ...professorToAdd, email: e.target.value })
                            }
                        />
                        <TextField
                            label="Telefone"
                            variant="outlined"
                            value={editDialog ? editProfessor.phone : professorToAdd.phone}
                            onChange={(e) =>
                                editDialog
                                    ? setEditProfessor({ ...editProfessor, phone: e.target.value })
                                    : setProfessorToAdd({ ...professorToAdd, phone: e.target.value })
                            }
                        />
                        <FormControl>
                            <InputLabel id="title-label">Título</InputLabel>
                            <Select
                                labelId="title-label"
                                value={editDialog ? editProfessor.title : professorToAdd.title}
                                onChange={(e) =>
                                    editDialog
                                        ? setEditProfessor({ ...editProfessor, title: e.target.value as "Specialist" | "Master" | "Doctor" })
                                        : setProfessorToAdd({ ...professorToAdd, title: e.target.value as "Specialist" | "Master" | "Doctor" })
                                }
                            >
                                <MenuItem value="Specialist">Especialista</MenuItem>
                                <MenuItem value="Master">Mestre</MenuItem>
                                <MenuItem value="Doctor">Doutor</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Instituição"
                            variant="outlined"
                            value={editDialog ? editProfessor.institutionFk : professorToAdd.institutionFk}
                            onChange={(e) =>
                                editDialog
                                    ? setEditProfessor({ ...editProfessor, institutionFk: e.target.value })
                                    : setProfessorToAdd({ ...professorToAdd, institutionFk: e.target.value })
                            }
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" color="warning">
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSaveProfessor}
                        variant="contained"
                        color="primary"
                    >
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
