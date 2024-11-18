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
import { DisciplineModel } from "../models/discipline.model";
import { DisciplineService } from "../services/discipline.service";

export function DisciplinesPage() {
    const { confirm } = useConfirm();
    const navigate = useNavigate();
    const { snackbar } = useSnackbar();
    const { setLoading } = useLoading();

    const [disciplines, setDisciplines] = useState<DisciplineModel[]>([]);
    const [filteredDisciplines, setFilteredDisciplines] = useState<DisciplineModel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [editDiscipline, setEditDiscipline] = useState<DisciplineModel>({} as DisciplineModel);
    const [disciplineToAdd, setDisciplineToAdd] = useState<DisciplineModel>({} as DisciplineModel);

    const handleDialogOpen = () => setAddOpen(true);
    const handleDialogClose = () => setAddOpen(false);

    const handleEditDiscipline = (discipline: DisciplineModel) => {
        if (discipline) {
            setEditDiscipline(discipline);
            setEditDialog(true);
            handleDialogOpen();
        }
    };

    const fetchDisciplines = async () => {
        setLoading(true);
        const response = await DisciplineService.getAllDisciplines(navigate);

        if (!response.success) {
            snackbar({
                severity: "error",
                message: response.message,
                delay: 5000,
            });
        }

        if (response.data) {
            setDisciplines(response.data);
            setFilteredDisciplines(response.data); // Inicializa a tabela com todos os dados
        }

        setLoading(false);
    };

    const handleSaveDiscipline = async () => {
        setLoading(true);
        if (editDialog) {
            const updateResp = await DisciplineService.updateDiscipline(navigate, editDiscipline, editDiscipline.code);

            snackbar({
                severity: updateResp.success ? "success" : "error",
                message: updateResp.message,
                delay: 5000,
            });

            fetchDisciplines();
        } else {
            const addResp = await DisciplineService.addDiscipline(navigate, disciplineToAdd);

            snackbar({
                severity: addResp.success ? "success" : "error",
                message: addResp.message,
                delay: 5000,
            });

            fetchDisciplines();
        }
        setLoading(false);
        setAddOpen(false);
        setEditDialog(false);
    };

    const handleDeleteDiscipline = async (discipline: DisciplineModel) => {
        setLoading(true);
        const deleteResp = await DisciplineService.deleteDiscipline(navigate, discipline);

        snackbar({
            severity: deleteResp.success ? "success" : "error",
            message: deleteResp.message,
            delay: 5000,
        });

        fetchDisciplines();
        setLoading(false);
    };

    const handleCancel = () => {
        setDisciplineToAdd({} as DisciplineModel);
        setEditDiscipline({} as DisciplineModel);
        setEditDialog(false);
        handleDialogClose();
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        // Filtra os dados com base no termo de pesquisa
        const filtered = disciplines.filter((discipline) =>
            discipline.name.toLowerCase().includes(value) ||
            discipline.code.toLowerCase().includes(value) ||
            discipline.courseCode.toLowerCase().includes(value)
        );
        setFilteredDisciplines(filtered);
    };

    useEffect(() => {
        fetchDisciplines();
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
                    Adicionar Disciplina
                </Button>
            </div>

            {/* Tabela */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Código</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Carga Horária</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Período</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Descrição</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Curso</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDisciplines.map((discipline) => (
                            <TableRow key={discipline.id}>
                                <TableCell>{discipline.code}</TableCell>
                                <TableCell>{discipline.name}</TableCell>
                                <TableCell>{discipline.workload}</TableCell>
                                <TableCell>{discipline.period}</TableCell>
                                <TableCell>{discipline.description}</TableCell>
                                <TableCell>{discipline.courseCode}</TableCell>
                                <TableCell>
                                    <Button startIcon={<Edit />} onClick={() => handleEditDiscipline(discipline)} />
                                    <Button
                                        startIcon={<Delete />}
                                        onClick={() =>
                                            confirm({
                                                title: "Deletar Disciplina",
                                                description: `Tem certeza que deseja deletar a disciplina [${discipline.name}]? Essa ação é irreversível.`,
                                                handleConfirm: () => handleDeleteDiscipline(discipline),
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
                <DialogTitle>{editDialog ? "Editar Disciplina" : "Adicionar Disciplina"}</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4">
                        <TextField
                            label="Código"
                            variant="outlined"
                            value={editDialog ? editDiscipline.code : disciplineToAdd.code}
                            onChange={(e) =>
                                editDialog
                                    ? setEditDiscipline({ ...editDiscipline, code: e.target.value })
                                    : setDisciplineToAdd({ ...disciplineToAdd, code: e.target.value })
                            }
                            disabled={editDialog}
                        />
                        <TextField
                            label="Nome"
                            variant="outlined"
                            value={editDialog ? editDiscipline.name : disciplineToAdd.name}
                            onChange={(e) =>
                                editDialog
                                    ? setEditDiscipline({ ...editDiscipline, name: e.target.value })
                                    : setDisciplineToAdd({ ...disciplineToAdd, name: e.target.value })
                            }
                        />
                        <TextField
                            label="Carga Horária"
                            variant="outlined"
                            type="number"
                            value={editDialog ? editDiscipline.workload : disciplineToAdd.workload}
                            onChange={(e) =>
                                editDialog
                                    ? setEditDiscipline({ ...editDiscipline, workload: Number(e.target.value) })
                                    : setDisciplineToAdd({ ...disciplineToAdd, workload: Number(e.target.value) })
                            }
                        />
                        <TextField
                            label="Período"
                            variant="outlined"
                            type="number"
                            value={editDialog ? editDiscipline.period : disciplineToAdd.period}
                            onChange={(e) =>
                                editDialog
                                    ? setEditDiscipline({ ...editDiscipline, period: Number(e.target.value) })
                                    : setDisciplineToAdd({ ...disciplineToAdd, period: Number(e.target.value) })
                            }
                        />
                        <TextField
                            label="Descrição"
                            variant="outlined"
                            value={editDialog ? editDiscipline.description : disciplineToAdd.description}
                            onChange={(e) =>
                                editDialog
                                    ? setEditDiscipline({ ...editDiscipline, description: e.target.value })
                                    : setDisciplineToAdd({ ...disciplineToAdd, description: e.target.value })
                            }
                        />
                        <TextField
                            label="Código do Curso"
                            variant="outlined"
                            value={editDialog ? editDiscipline.courseCode : disciplineToAdd.courseCode}
                            onChange={(e) =>
                                editDialog
                                    ? setEditDiscipline({ ...editDiscipline, courseCode: e.target.value })
                                    : setDisciplineToAdd({ ...disciplineToAdd, courseCode: e.target.value })
                            }
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" color="warning">
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSaveDiscipline}
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
