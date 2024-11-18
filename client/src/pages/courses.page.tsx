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
import { CourseModel } from "../models/course.model";
import { CourseService } from "../services/course.service";

export function CoursesPage() {
    const { confirm } = useConfirm();
    const navigate = useNavigate();
    const { snackbar } = useSnackbar();
    const { setLoading } = useLoading();

    const [courses, setCourses] = useState<CourseModel[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<CourseModel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [editCourse, setEditCourse] = useState<CourseModel>({} as CourseModel);
    const [courseToAdd, setCourseToAdd] = useState<CourseModel>({} as CourseModel);

    const handleDialogOpen = () => setAddOpen(true);
    const handleDialogClose = () => setAddOpen(false);

    const handleEditCourse = (course: CourseModel) => {
        if (course) {
            setEditCourse(course);
            setEditDialog(true);
            handleDialogOpen();
        }
    };

    const fetchCourses = async () => {
        setLoading(true);
        const response = await CourseService.getAllCourses(navigate);

        if (!response.success) {
            snackbar({
                severity: "error",
                message: response.message,
                delay: 5000,
            });
        }

        if (response.data) {
            setCourses(response.data);
            setFilteredCourses(response.data); // Inicializa com todos os cursos
        }

        setLoading(false);
    };

    const handleSaveCourse = async () => {
        setLoading(true);
        if (editDialog) {
            const updateResp = await CourseService.updateCourse(navigate, editCourse, editCourse.code);

            snackbar({
                severity: updateResp.success ? "success" : "error",
                message: updateResp.message,
                delay: 5000,
            });

            fetchCourses();
        } else {
            const addResp = await CourseService.addCourse(navigate, courseToAdd);

            snackbar({
                severity: addResp.success ? "success" : "error",
                message: addResp.message,
                delay: 5000,
            });

            fetchCourses();
        }
        setLoading(false);
        setAddOpen(false);
        setEditDialog(false);
    };

    const handleDeleteCourse = async (course: CourseModel) => {
        setLoading(true);
        const deleteResp = await CourseService.deleteCourse(navigate, course);

        snackbar({
            severity: deleteResp.success ? "success" : "error",
            message: deleteResp.message,
            delay: 5000,
        });

        fetchCourses();
        setLoading(false);
    };

    const handleCancel = () => {
        setCourseToAdd({} as CourseModel);
        setEditCourse({} as CourseModel);
        setEditDialog(false);
        handleDialogClose();
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        // Filtrar os dados com base no termo de pesquisa
        const filtered = courses.filter((course) =>
            course.name.toLowerCase().includes(value) ||
            course.code.toLowerCase().includes(value) ||
            course.institutionFk.toLowerCase().includes(value)
        );
        setFilteredCourses(filtered);
    };

    useEffect(() => {
        fetchCourses();
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
                    Adicionar Curso
                </Button>
            </div>

            {/* Tabela */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Código</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Duração</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Descrição</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Instituição</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCourses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.code}</TableCell>
                                <TableCell>{course.name}</TableCell>
                                <TableCell>{course.duration}</TableCell>
                                <TableCell>{course.description}</TableCell>
                                <TableCell>{course.institutionFk}</TableCell>
                                <TableCell>
                                    <Button startIcon={<Edit />} onClick={() => handleEditCourse(course)} />
                                    <Button
                                        startIcon={<Delete />}
                                        onClick={() =>
                                            confirm({
                                                title: "Deletar Curso",
                                                description: `Tem certeza que deseja deletar o curso [${course.name}]? Essa ação é irreversível.`,
                                                handleConfirm: () => handleDeleteCourse(course),
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
                <DialogTitle>{editDialog ? "Editar Curso" : "Adicionar Curso"}</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4">
                        <TextField
                            label="Código"
                            variant="outlined"
                            value={editDialog ? editCourse.code : courseToAdd.code}
                            onChange={(e) =>
                                editDialog
                                    ? setEditCourse({ ...editCourse, code: e.target.value })
                                    : setCourseToAdd({ ...courseToAdd, code: e.target.value })
                            }
                            disabled={editDialog}
                        />
                        <TextField
                            label="Nome"
                            variant="outlined"
                            value={editDialog ? editCourse.name : courseToAdd.name}
                            onChange={(e) =>
                                editDialog
                                    ? setEditCourse({ ...editCourse, name: e.target.value })
                                    : setCourseToAdd({ ...courseToAdd, name: e.target.value })
                            }
                        />
                        <TextField
                            label="Duração"
                            variant="outlined"
                            type="number"
                            value={editDialog ? editCourse.duration : courseToAdd.duration}
                            onChange={(e) =>
                                editDialog
                                    ? setEditCourse({ ...editCourse, duration: Number(e.target.value) })
                                    : setCourseToAdd({ ...courseToAdd, duration: Number(e.target.value) })
                            }
                        />
                        <TextField
                            label="Descrição"
                            variant="outlined"
                            value={editDialog ? editCourse.description : courseToAdd.description}
                            onChange={(e) =>
                                editDialog
                                    ? setEditCourse({ ...editCourse, description: e.target.value })
                                    : setCourseToAdd({ ...courseToAdd, description: e.target.value })
                            }
                        />
                        <TextField
                            label="Instituição"
                            variant="outlined"
                            value={editDialog ? editCourse.institutionFk : courseToAdd.institutionFk}
                            onChange={(e) =>
                                editDialog
                                    ? setEditCourse({ ...editCourse, institutionFk: e.target.value })
                                    : setCourseToAdd({ ...courseToAdd, institutionFk: e.target.value })
                            }
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" color="warning">
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSaveCourse}
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
