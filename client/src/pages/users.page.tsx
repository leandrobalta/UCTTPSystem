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
import { UserModel, UserLevel } from "../models/user.model";
import { UserService } from "../services/user.service";

export function UserPage() {
    const { confirm } = useConfirm();
    const navigate = useNavigate();
    const { snackbar } = useSnackbar();
    const { setLoading } = useLoading();

    const [users, setUsers] = useState<UserModel[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserModel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [editUser, setEditUser] = useState<UserModel>({} as UserModel);
    const [userToAdd, setUserToAdd] = useState<UserModel>({} as UserModel);

    const handleDialogOpen = () => setAddOpen(true);
    const handleDialogClose = () => setAddOpen(false);

    const handleEditUser = (user: UserModel) => {
        if (user) {
            setEditUser(user);
            setEditDialog(true);
            handleDialogOpen();
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        const response = await UserService.getAllUsers(navigate);

        if (!response.success) {
            snackbar({
                severity: "error",
                message: response.message,
                delay: 5000,
            });
        }

        if (response.data) {
            setUsers(response.data);
            setFilteredUsers(response.data); // Inicializa com todos os usuários
        }

        setLoading(false);
    };

    const handleSaveUser = async () => {
        setLoading(true);
        if (editDialog) {
            const updateResp = await UserService.updateUser(navigate, editUser, editUser.email);

            snackbar({
                severity: updateResp.success ? "success" : "error",
                message: updateResp.message,
                delay: 5000,
            });

            fetchUsers();
        } else {
            const addResp = await UserService.addUser(navigate, userToAdd);

            snackbar({
                severity: addResp.success ? "success" : "error",
                message: addResp.message,
                delay: 5000,
            });

            fetchUsers();
        }
        setLoading(false);
        setAddOpen(false);
        setEditDialog(false);
    };

    const handleDeleteUser = async (user: UserModel) => {
        setLoading(true);
        const deleteResp = await UserService.deleteUser(navigate, user);

        snackbar({
            severity: deleteResp.success ? "success" : "error",
            message: deleteResp.message,
            delay: 5000,
        });

        fetchUsers();
        setLoading(false);
    };

    const handleCancel = () => {
        setUserToAdd({} as UserModel);
        setEditUser({} as UserModel);
        setEditDialog(false);
        handleDialogClose();
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        // Filtrar os dados com base no termo de pesquisa
        const filtered = users.filter(
            (user) =>
                user.name.toLowerCase().includes(value) ||
                user.email.toLowerCase().includes(value) ||
                user.institutionFk.toLowerCase().includes(value)
        );
        setFilteredUsers(filtered);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4 h-full w-full items-start bg-[#f8f6f7]">
            {/* Barra de Pesquisa e Botão Adicionar */}
            <div className="flex w-full justify-between items-center">
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
                    Adicionar Usuário
                </Button>
            </div>

            {/* Tabela */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Nível</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Instituição</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.userLevel}</TableCell>
                                <TableCell>{user.institutionFk}</TableCell>
                                <TableCell>
                                    <Button startIcon={<Edit />} onClick={() => handleEditUser(user)} />
                                    <Button
                                        startIcon={<Delete />}
                                        onClick={() =>
                                            confirm({
                                                title: "Deletar Usuário",
                                                description: `Tem certeza que deseja deletar o usuário [${user.name}]? Essa ação é irreversível.`,
                                                handleConfirm: () => handleDeleteUser(user),
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
                <DialogTitle>{editDialog ? "Editar Usuário" : "Adicionar Usuário"}</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4">
                        <TextField
                            label="Nome"
                            variant="outlined"
                            value={editDialog ? editUser.name : userToAdd.name}
                            onChange={(e) =>
                                editDialog
                                    ? setEditUser({ ...editUser, name: e.target.value })
                                    : setUserToAdd({ ...userToAdd, name: e.target.value })
                            }
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={editDialog ? editUser.email : userToAdd.email}
                            onChange={(e) =>
                                editDialog
                                    ? setEditUser({ ...editUser, email: e.target.value })
                                    : setUserToAdd({ ...userToAdd, email: e.target.value })
                            }
                            disabled={editDialog}
                        />
                        {!editDialog && (
                            <TextField
                                label="Senha"
                                variant="outlined"
                                type="password"
                                value={userToAdd.password || ""}
                                onChange={(e) => setUserToAdd({ ...userToAdd, password: e.target.value })}
                            />
                        )}
                        <FormControl>
                            <InputLabel id="user-level-label">Nível</InputLabel>
                            <Select
                                labelId="user-level-label"
                                value={editDialog ? editUser.userLevel : userToAdd.userLevel}
                                onChange={(e) =>
                                    editDialog
                                        ? setEditUser({ ...editUser, userLevel: e.target.value as UserLevel })
                                        : setUserToAdd({ ...userToAdd, userLevel: e.target.value as UserLevel })
                                }
                            >
                                <MenuItem value={UserLevel.ADMIN}>Administrador</MenuItem>
                                <MenuItem value={UserLevel.USER}>Usuário</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Instituição"
                            variant="outlined"
                            value={editDialog ? editUser.institutionFk : userToAdd.institutionFk}
                            onChange={(e) =>
                                editDialog
                                    ? setEditUser({ ...editUser, institutionFk: e.target.value })
                                    : setUserToAdd({ ...userToAdd, institutionFk: e.target.value })
                            }
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" color="warning">
                        Cancelar
                    </Button>
                    <Button onClick={handleSaveUser} variant="contained" color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
