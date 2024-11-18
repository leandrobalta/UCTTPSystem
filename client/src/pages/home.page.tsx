// src/components/UserControlPage.tsx
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useConfirm } from "../hooks/use-alert-utils";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../hooks/use-alert-utils";
import { useLoading } from "../hooks/use-loading";

export const HomePage: React.FC = () => {
    // const { confirm } = useConfirm();
    // const navigate = useNavigate();
    // const { snackbar } = useSnackbar();
    // const { setLoading } = useLoading();

    // const [users, setUsers] = useState<UserModel[]>([]);
    // const [addOpen, setAddOpen] = useState(false);
    // const [editDialog, setEditDialog] = useState(false);
    // const [editUser, setEditUser] = useState<UserModel>({} as UserModel);
    // const [userToAdd, setUserToAdd] = useState<UserModel>({} as UserModel);

    // const handleDialogOpen = () => setAddOpen(true);
    // const handleDialogClose = () => setAddOpen(false);

    // const handleEditUser = (user: UserModel) => {
    //     if (user) {
    //         setEditUser(user);
    //         setEditDialog(true);
    //         handleDialogOpen();
    //     }
    // };

    // const callGetAllUsers = async () => {
    //     setLoading(true);
    //     const response = await UserService.getAllUsers(navigate);

    //     if (!response.success) {
    //         snackbar({
    //             severity: "error",
    //             message: response.message,
    //             delay: 5000,
    //         });
    //     }

    //     if (response.data) {
    //         setUsers(response.data);
    //     }

    //     setLoading(false);
    // };

    // const handleSaveUser = async () => {
    //     setLoading(true);
    //     if (editDialog) {
    //         let userToEdit = { ...editUser };

    //         if (userToEdit.password === users.find((u) => u.id === userToEdit.id)?.password) {
    //             userToEdit.password = null;
    //         }

    //         const updateResp = await UserService.updateUser(navigate, userToEdit);

    //         snackbar({
    //             severity: updateResp.success ? "success" : "error",
    //             message: updateResp.message,
    //             delay: 5000,
    //         });

    //         callGetAllUsers();
    //     } else {
    //         const addResp = await UserService.addUser(navigate, userToAdd);

    //         snackbar({
    //             severity: addResp.success ? "success" : "error",
    //             message: addResp.message,
    //             delay: 5000,
    //         });

    //         callGetAllUsers();
    //     }
    //     setLoading(false);
    //     setAddOpen(false);
    //     setEditDialog(false);
    // };

    // const handleDeleteUser = async (user: UserModel) => {
    //     setLoading(true);
    //     const deleteResp = await UserService.deleteUser(navigate, user);

    //     snackbar({
    //         severity: deleteResp.success ? "success" : "error",
    //         message: deleteResp.message,
    //         delay: 5000,
    //     });

    //     callGetAllUsers();
    //     setLoading(false);
    // };

    // const handleCancel = () => {
    //     setUserToAdd({} as UserModel);
    //     setEditUser({} as UserModel);
    //     setEditDialog(false);
    //     handleDialogClose();
    // };

    // const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (editDialog) {
    //         setEditUser({ ...editUser, userName: e.target.value });
    //     } else {
    //         setUserToAdd({ ...userToAdd, userName: e.target.value });
    //     }
    // };

    // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (editDialog) {
    //         setEditUser({ ...editUser, email: e.target.value });
    //     } else {
    //         setUserToAdd({ ...userToAdd, email: e.target.value });
    //     }
    // };

    // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (editDialog) {
    //         setEditUser({ ...editUser, password: e.target.value });
    //     } else {
    //         setUserToAdd({ ...userToAdd, password: e.target.value });
    //     }
    // };

    // const handleIsAdminChange = (e: React.SyntheticEvent<Element, Event>) => {
    //     const target = e.target as HTMLInputElement;
    //     if (editDialog) {
    //         setEditUser({ ...editUser, isAdmin: target.checked });
    //     } else {
    //         setUserToAdd({ ...userToAdd, isAdmin: target.checked });
    //     }
    // };

    // const editAndSaveDialogDisabled = () => {
    //     if (editDialog) {
    //         return (
    //             !editUser.userName ||
    //             !editUser.email ||
    //             !editUser.password ||
    //             editUser === users.find((u) => u.id === editUser.id)
    //         );
    //     } else {
    //         return !userToAdd.userName || !userToAdd.email || !userToAdd.password;
    //     }
    // };

    // useEffect(() => {
    //     callGetAllUsers();
    // }, []);

    // return (
    //     <div className="flex flex-col gap-4 p-4 h-full w-full items-start bg-[#f8f6f7]">
    //         <Button
    //             startIcon={<Add />}
    //             variant="contained"
    //             color="primary"
    //             onClick={handleDialogOpen}
    //             className="m-4 self-end"
    //         >
    //             Adicionar Usuário
    //         </Button>

    //         <TableContainer component={Paper} className="">
    //             <Table>
    //                 <TableHead>
    //                     <TableRow>
    //                         <TableCell sx={{ fontWeight: "bold" }} align="center">
    //                             ID
    //                         </TableCell>
    //                         <TableCell sx={{ fontWeight: "bold" }} align="center">
    //                             Criado em
    //                         </TableCell>
    //                         <TableCell sx={{ fontWeight: "bold" }} align="center">
    //                             Atualizado em
    //                         </TableCell>
    //                         <TableCell sx={{ fontWeight: "bold" }} align="center">
    //                             Criado por
    //                         </TableCell>
    //                         <TableCell sx={{ fontWeight: "bold" }} align="center">
    //                             Atualizado por
    //                         </TableCell>
    //                         <TableCell sx={{ fontWeight: "bold" }} align="center">
    //                             Usuario
    //                         </TableCell>
    //                         <TableCell sx={{ fontWeight: "bold" }} align="center">
    //                             Email
    //                         </TableCell>
    //                         <TableCell sx={{ fontWeight: "bold" }} align="center">
    //                             Senha (Encriptografada)
    //                         </TableCell>
    //                         <TableCell sx={{ fontWeight: "bold" }} align="center">
    //                             {"É administrador"}
    //                         </TableCell>
    //                         <TableCell sx={{ fontWeight: "bold" }} align="center">
    //                             {"Ações"}
    //                         </TableCell>
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                     {users.map((user) => (
    //                         <TableRow key={user.id}>
    //                             <TableCell align="center">{user.id}</TableCell>
    //                             <TableCell align="center">{user.createdAt}</TableCell>
    //                             <TableCell align="center">{user.updatedAt}</TableCell>
    //                             <TableCell align="center">{user.createdBy}</TableCell>
    //                             <TableCell align="center">{user.updatedBy}</TableCell>
    //                             <TableCell align="center">{user.userName}</TableCell>
    //                             <TableCell align="center">{user.email}</TableCell>
    //                             <TableCell align="center">{user.password}</TableCell>
    //                             <TableCell align="center">{user.isAdmin ? "Sim" : "Não"}</TableCell>
    //                             <TableCell align="center">
    //                                 <Button startIcon={<Edit />} onClick={(_e) => handleEditUser(user)} />
    //                                 <Button
    //                                     startIcon={<Delete />}
    //                                     onClick={(_e) =>
    //                                         confirm({
    //                                             title: "Deletar Usuário",
    //                                             description: `Tem certeza que deseja deletar o usuário ${user.userName}?. Essa ação é irreversível.`,
    //                                             handleConfirm: () => handleDeleteUser(user),
    //                                         })
    //                                     }
    //                                 />
    //                             </TableCell>
    //                         </TableRow>
    //                     ))}
    //                 </TableBody>
    //             </Table>
    //         </TableContainer>

    //         <Dialog open={addOpen} onClose={handleDialogClose}>
    //             <DialogTitle sx={{ fontWeight: "bold" }}>
    //                 {editDialog ? "Editar informações do usuário" : "Adicionar usuário"}
    //             </DialogTitle>
    //             <DialogContent>
    //                 <TextField
    //                     autoFocus
    //                     margin="dense"
    //                     id="username"
    //                     label="Usuario"
    //                     type="text"
    //                     fullWidth
    //                     variant="outlined"
    //                     value={editDialog ? editUser?.userName : userToAdd?.userName}
    //                     onChange={handleUsernameChange}
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     id="email"
    //                     label="Email"
    //                     type="email"
    //                     fullWidth
    //                     variant="outlined"
    //                     value={editDialog ? editUser?.email : userToAdd.email}
    //                     onChange={handleEmailChange}
    //                 />
    //                 <TextField
    //                     margin="dense"
    //                     id="password"
    //                     label="Senha (Nao encriptada)"
    //                     type="text"
    //                     fullWidth
    //                     variant="outlined"
    //                     value={editDialog ? editUser?.password : userToAdd.password}
    //                     onChange={handlePasswordChange}
    //                 />
    //                 <FormControlLabel
    //                     control={<Checkbox checked={editDialog ? editUser?.isAdmin : userToAdd.isAdmin} />}
    //                     label="É administrador?"
    //                     value={editDialog ? editUser?.isAdmin : userToAdd.isAdmin}
    //                     onChange={handleIsAdminChange}
    //                 />
    //             </DialogContent>
    //             <DialogActions>
    //                 <Button onClick={handleCancel} variant="contained" color="warning">
    //                     Cancelar
    //                 </Button>
    //                 <Button
    //                     onClick={(_e) =>
    //                         confirm({
    //                             title: "Salvar Usuário",
    //                             description: `Tem certeza que deseja salvar o usuário?`,
    //                             handleConfirm: handleSaveUser,
    //                         })
    //                     }
    //                     variant="contained"
    //                     color="primary"
    //                     disabled={editAndSaveDialogDisabled()}
    //                 >
    //                     Salvar
    //                 </Button>
    //             </DialogActions>
    //         </Dialog>
    //     </div>
    // );

    return (
        <div>HomePage</div>
    )
};
