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
import { ClassroomModel } from "../models/classroom.model";
import { ClassroomService } from "../services/classroom.service";

export function ClassroomsPage() {
    const { confirm } = useConfirm();
    const navigate = useNavigate();
    const { snackbar } = useSnackbar();
    const { setLoading } = useLoading();

    const [classrooms, setClassrooms] = useState<ClassroomModel[]>([]);
    const [filteredClassrooms, setFilteredClassrooms] = useState<ClassroomModel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [editClassroom, setEditClassroom] = useState<ClassroomModel>({} as ClassroomModel);
    const [classroomToAdd, setClassroomToAdd] = useState<ClassroomModel>({} as ClassroomModel);

    const handleDialogOpen = () => setAddOpen(true);
    const handleDialogClose = () => setAddOpen(false);

    const handleEditClassroom = (classroom: ClassroomModel) => {
        if (classroom) {
            setEditClassroom(classroom);
            setEditDialog(true);
            handleDialogOpen();
        }
    };

    const fetchClassrooms = async () => {
        setLoading(true);
        const response = await ClassroomService.getAllClassrooms(navigate);

        if (!response.success) {
            snackbar({
                severity: "error",
                message: response.message,
                delay: 5000,
            });
        }

        if (response.data) {
            setClassrooms(response.data);
            setFilteredClassrooms(response.data);
        }

        setLoading(false);
    };

    const handleSaveClassroom = async () => {
        setLoading(true);
        if (editDialog) {
            const updateResp = await ClassroomService.updateClassroom(navigate, editClassroom, editClassroom.name);

            snackbar({
                severity: updateResp.success ? "success" : "error",
                message: updateResp.message,
                delay: 5000,
            });

            fetchClassrooms();
        } else {
            const addResp = await ClassroomService.addClassroom(navigate, classroomToAdd);

            snackbar({
                severity: addResp.success ? "success" : "error",
                message: addResp.message,
                delay: 5000,
            });

            fetchClassrooms();
        }
        setLoading(false);
        setAddOpen(false);
        setEditDialog(false);
    };

    const handleDeleteClassroom = async (classroom: ClassroomModel) => {
        setLoading(true);
        const deleteResp = await ClassroomService.deleteClassroom(navigate, classroom);

        snackbar({
            severity: deleteResp.success ? "success" : "error",
            message: deleteResp.message,
            delay: 5000,
        });

        fetchClassrooms();
        setLoading(false);
    };

    const handleCancel = () => {
        setClassroomToAdd({} as ClassroomModel);
        setEditClassroom({} as ClassroomModel);
        setEditDialog(false);
        handleDialogClose();
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = classrooms.filter((classroom) => classroom.name.toLowerCase().includes(value));
        setFilteredClassrooms(filtered);
    };

    useEffect(() => {
        fetchClassrooms();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4 h-full w-full items-start bg-[#f8f6f7]">
            {/* Barra de Pesquisa e Botão Adicionar */}
            <div className="flex w-full justify-between items-center gap-10">
                <TextField
                    name="search"
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
                    Adicionar Sala
                </Button>
            </div>

            {/* Tabela */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Instituição</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredClassrooms.map((classroom) => (
                            <TableRow key={classroom.id}>
                                <TableCell>{classroom.name}</TableCell>
                                <TableCell>{classroom.institutionFk}</TableCell>
                                <TableCell>
                                    <Button
                                        aria-label="editar"
                                        startIcon={<Edit />}
                                        onClick={() => handleEditClassroom(classroom)}
                                    />
                                    <Button
                                        aria-label="remover"
                                        startIcon={<Delete />}
                                        onClick={() =>
                                            confirm({
                                                title: "Deletar Sala",
                                                description: `Tem certeza que deseja deletar a sala [${classroom.name}]? Essa ação é irreversível.`,
                                                handleConfirm: () => handleDeleteClassroom(classroom),
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
                <DialogTitle>{editDialog ? "Editar Sala" : "Adicionar Sala"}</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4">
                        <TextField
                            label="Nome"
                            name="nome"
                            variant="outlined"
                            value={editDialog ? editClassroom.name : classroomToAdd.name}
                            onChange={(e) =>
                                editDialog
                                    ? setEditClassroom({ ...editClassroom, name: e.target.value })
                                    : setClassroomToAdd({ ...classroomToAdd, name: e.target.value })
                            }
                            disabled={editDialog}
                        />
                        <TextField
                            name="instituicao"
                            label="Instituição"
                            variant="outlined"
                            value={editDialog ? editClassroom.institutionFk : classroomToAdd.institutionFk}
                            onChange={(e) =>
                                editDialog
                                    ? setEditClassroom({
                                          ...editClassroom,
                                          institutionFk: e.target.value,
                                      })
                                    : setClassroomToAdd({
                                          ...classroomToAdd,
                                          institutionFk: e.target.value,
                                      })
                            }
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" color="warning">
                        Cancelar
                    </Button>
                    <Button onClick={handleSaveClassroom} variant="contained" color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
