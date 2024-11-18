import {
    Autocomplete,
    Avatar,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import SteeringIcon from "../icons/steering.icon";
import { Seat, Travel } from "../models/travel.model";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { useConfirm } from "../hooks/use-alert-utils";
import { ReservationModel } from "../models/reservation.model";
import { useLoading } from "../hooks/use-loading";
import { ReservationService } from "../services/reservation.service";
import { useSnackbar } from "../hooks/use-alert-utils";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DisciplineModel } from "../models/discipline.model";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ClientService } from "../services/discipline.service";

interface TravelItemProps {
    travel: Travel;
    callHydrate: () => void;
    clients: DisciplineModel[];
    callHydrateClients: () => void;
}

export function TravelItem(props: TravelItemProps) {
    const { confirm } = useConfirm();
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const { snackbar } = useSnackbar();

    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [reservationEditOpen, setReservationEditOpen] = useState(false);
    const [finishReservationOpen, setFinishReservationOpen] = useState(false);
    const [editReservation, setEditReservation] = useState<ReservationModel>({} as ReservationModel);
    const [reservationsToAdd, setReservationsToAdd] = useState<ReservationModel[]>([]);
    const [clientsToAdd, setClientsToAdd] = useState<number[]>([]);
    const [clientsReservations, setClientsReservations] = useState<number[]>([]);

    const handleSelectedSeat = (seatNumber: number) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const handleOpenPassengerInfo = (reservation: ReservationModel) => {
        setEditReservation(reservation);
        setReservationEditOpen(true);
    };

    const handleOpenFinishReservation = () => {
        setFinishReservationOpen(true);

        // add selected seats to reservations to add
        const reservations = selectedSeats.map((seat) => {
            return {
                tripID: props.travel.trip.id,
                seatNumber: seat,
                passengerName: "",
                identityType: "",
                identity: "",
                cityThatLives: "",
                phoneNumber: "",
                dateOfBirth: "",
            };
        });

        setReservationsToAdd(reservations as ReservationModel[]);
    };

    const getSeatColor = (seat: Seat) => {
        if (seat.number === 0) {
            return "inherit";
        }

        if (seat.reservation !== null) {
            return "inherit";
        }
        if (selectedSeats.includes(seat.number)) {
            return "secondary";
        }
        return "primary";
    };

    // const getMaskByIndentityType = (index?: number) => {
    //     let mask = "";
    //     let reservationToCheck = editReservation;

    //     if (index !== undefined) {
    //         reservationToCheck = reservationsToAdd[index];
    //     }

    //     if (reservationToCheck.identityType === "CPF") {
    //         mask = "999.999.999-99";
    //     } else if (reservationToCheck.identityType === "RG") {
    //         mask = "9.999.999";
    //     } else {
    //         mask = "9999999";
    //     }

    //     return mask;
    // };

    const handleAddReservation = async () => {
        setLoading(true);
        // check if any property is null
        const reservationsToAddFiltered = reservationsToAdd.filter(
            (reservation) =>
                reservation.passengerName &&
                //reservation.email &&
                reservation.phoneNumber &&
                reservation.identityType &&
                reservation.identity &&
                reservation.dateOfBirth
        );

        if (reservationsToAddFiltered.length !== reservationsToAdd.length) {
            snackbar({
                message: "Preencha todos os campos",
                severity: "error",
                delay: 5000,
            });
            setLoading(false);
            return;
        }

        const response = await ReservationService.addManyReservations(navigate, reservationsToAdd);

        snackbar({
            message: response.message,
            severity: response.success ? "success" : "error",
            delay: 10000,
        });

        if (response.success) {
            setFinishReservationOpen(false);
            setSelectedSeats([]);
        }

        props.callHydrate();
        setLoading(false);
    };

    const handleFinishReservation = async () => {
        const addClientsSuccess = await handleAddClients();
        if (!addClientsSuccess) {
            return;
        }
        await handleAddReservation();
    };

    const handleUpdateReservation = async () => {
        setLoading(true);
        const response = await ReservationService.updateReservation(navigate, editReservation);

        snackbar({
            message: response.message,
            severity: response.success ? "success" : "error",
            delay: 5000,
        });

        if (response.success) {
            setReservationEditOpen(false);
        }

        props.callHydrate();
        setLoading(false);
    };

    const handleDeleteReservation = async () => {
        setLoading(true);

        const response = await ReservationService.deleteReservation(navigate, editReservation);

        snackbar({
            message: response.message,
            severity: response.success ? "success" : "error",
            delay: 5000,
        });

        if (response.success) {
            setReservationEditOpen(false);
        }

        props.callHydrate();
        setLoading(false);
    };

    const handleAddReservationPassengerName = (e: any, index: number) => {
        setReservationsToAdd(
            reservationsToAdd.map((reservation, i) => {
                if (i === index) {
                    reservation.passengerName = e.target.value;
                }
                return reservation;
            })
        );
    };

    const handleAddReservationCityThatLives = (e: any, index: number) => {
        setReservationsToAdd(
            reservationsToAdd.map((reservation, i) => {
                if (i === index) {
                    reservation.cityThatLives = e.target.value;
                }
                return reservation;
            })
        );
    };

    const handleAddReservationPhoneNumber = (e: any, index: number) => {
        setReservationsToAdd(
            reservationsToAdd.map((reservation, i) => {
                if (i === index) {
                    reservation.phoneNumber = e.target.value;
                }
                return reservation;
            })
        );
    };

    const handleAddReservationIdentityType = (e: any, index: number) => {
        setReservationsToAdd(
            reservationsToAdd.map((reservation, i) => {
                if (i === index) {
                    reservation.identityType = e.target.value;
                    reservation.identity = "";
                }
                return reservation;
            })
        );
    };

    const handleAddReservationIdentity = (e: any, index: number) => {
        if (e.target.value.length > 20) {
            snackbar({
                message: "Número de documento muito grande",
                severity: "error",
                delay: 5000,
            });
            return;
        }
        setReservationsToAdd(
            reservationsToAdd.map((reservation, i) => {
                if (i === index) {
                    reservation.identity = e.target.value;
                }
                return reservation;
            })
        );
    };

    const handleAddReservationDateOfBirth = (date: dayjs.Dayjs | null, index: number) => {
        if (!date) {
            return;
        }

        setReservationsToAdd(
            reservationsToAdd.map((reservation, i) => {
                if (i === index) {
                    reservation.dateOfBirth = date.toISOString();
                }
                return reservation;
            })
        );
    };

    const prettifierDateString = (date: string) => {
        const prettyDate = new Date(date);

        return prettyDate.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const prettifierDestiny = (destiny: string) => {
        if (destiny === "goiania") {
            return "Goiânia";
        } else if (destiny === "sao_paulo") {
            return "São Paulo";
        }
        return destiny;
    };

    const handleDownloadReservationsFile = () => {
        const allSeats = props.travel.leftSeats.concat(props.travel.rightSeats);

        const allReservations = allSeats.filter((x) => x.reservation !== null).map((x) => x.reservation);

        if (allReservations.length === 0) {
            snackbar({
                message: "Viagem não possui passageiros.",
                severity: "error",
                delay: 5000,
            });
            return;
        }

        let fileContent = "Nome,Identidade,TipoIdentidade\n";

        allReservations.map((reservation) => {
            fileContent += `${reservation?.passengerName},${reservation?.identity},${reservation?.identityType}\n`;
        });

        const element = document.createElement("a");
        const file = new Blob([fileContent], { type: "text/csv;encoding:utf-8" });
        element.href = URL.createObjectURL(file);
        element.download = `passageiros_viagem_${props.travel.trip.destination.toLowerCase()}_${
            props.travel.trip.departureDateTime
        }`;
        document.body.appendChild(element);
        element.click();
    };

    const handleAlreadyClient = (value: string | null, index: number) => {
        if (!value) {
            setClientsReservations(clientsReservations.filter((c) => c !== index));
            return;
        }

        const client = props.clients.find((c) => c.clientName === value);

        if (!client) {
            snackbar({
                message: "Cliente não encontrado",
                severity: "error",
                delay: 5000,
            });
            return;
        }

        setReservationsToAdd(
            reservationsToAdd.map((reservation, i) => {
                if (i === index) {
                    reservation.passengerName = client.clientName;
                    reservation.cityThatLives = client.cityThatLives;
                    reservation.phoneNumber = client.phoneNumber;
                    reservation.identityType = client.identityType;
                    reservation.identity = client.identity;
                    reservation.dateOfBirth = client.dateOfBirth;
                }
                return reservation;
            })
        );

        setClientsReservations([...clientsReservations, index]);
    };

    const handleChangeNeedAddClient = (index: number) => {
        if (clientsToAdd.includes(index)) {
            setClientsToAdd(clientsToAdd.filter((c) => c !== index));
        } else {
            setClientsToAdd([...clientsToAdd, index]);
        }
    };

    const handleAddClients = async () => {
        if (clientsToAdd.length === 0) {
            return true;
        }

        setLoading(true);

        const reservationsFiltered = reservationsToAdd.filter((_reservation, index) => clientsToAdd.includes(index));

        const newClients: DisciplineModel[] = reservationsFiltered.map((reservation) => {
            return {
                clientName: reservation.passengerName,
                cityThatLives: reservation.cityThatLives,
                phoneNumber: reservation.phoneNumber,
                identityType: reservation.identityType,
                identity: reservation.identity,
                dateOfBirth: reservation.dateOfBirth,
            } as DisciplineModel;
        });

        const clientsToAddFiltered = newClients.filter(
            (client) =>
                client.clientName &&
                //client.email &&
                client.phoneNumber &&
                client.identityType &&
                client.identity &&
                client.dateOfBirth
        );

        if (clientsToAddFiltered.length !== clientsToAdd.length) {
            snackbar({
                message: "Preencha todos os campos",
                severity: "error",
                delay: 5000,
            });
            setLoading(false);
            return false;
        }

        const response = await ClientService.addManyClients(navigate, newClients);

        let success = false;

        snackbar({
            message: response.message,
            severity: response.success ? "success" : "error",
            delay: 10000,
        });

        if (response.success) {
            setClientsToAdd([]);
            props.callHydrateClients();
            success = true;
        }

        setLoading(false);
        return success;
    };

    const finishReservationConfirmButtonDisabled = () => {
        for (let i = 0; i < reservationsToAdd.length; i++) {
            if (!clientsToAdd.includes(i) && !clientsReservations.includes(i)) {
                return true;
            }
        }

        return false;
    };

    return (
        <>
            {/** bus - seats info */}
            <div className="flex flex-col gap-2 items-center w-full rounded bg-white shadow-lg p-4 max-md:px-0">
                {/**title section, align at start of the line */}
                <div className="flex w-full justify-between md:ml-10 items-center">
                    <Typography variant="h5" className="font-extrabold">
                        {"Ponta Porã"} - {prettifierDestiny(props.travel.trip.destination)} |{" "}
                        {prettifierDateString(props.travel.trip.departureDateTime)}
                    </Typography>

                    <IconButton
                        aria-label="delete"
                        sx={{ marginRight: "1.5rem" }}
                        size="large"
                        onClick={handleDownloadReservationsFile}
                    >
                        <FileDownloadIcon />
                    </IconButton>
                </div>

                <div className="p-4 max-md:px-0 flex flex-row w-full gap-8">
                    <div className="w-full p-4">
                        {/** bus - list of seats */}
                        <div className="h-64 border-2 rounded-3xl border-l-8 border-r-8 flex flex-row p-8 gap-4">
                            <div className="mt-auto ">
                                <SteeringIcon height={30} width={30} transform="rotate(270)" color="#e5e7eb" />
                            </div>
                            <Divider orientation="vertical" flexItem className="max-md:hidden" />
                            <div className="flex flex-col gap-2 justify-center w-full  max-md:overflow-x-auto">
                                {/** right side */}
                                <div className="flex flex-col-reverse gap-2 flex-wrap h-1/2 w-full">
                                    {props.travel.rightSeats.map((seat, index) => {
                                        return (
                                            <Button
                                                onClick={
                                                    seat.reservation
                                                        ? () => handleOpenPassengerInfo(seat.reservation!)
                                                        : () => handleSelectedSeat(seat.number)
                                                }
                                                variant="contained"
                                                // key is id + random number between -
                                                key={"right_" + index}
                                                color={getSeatColor(seat)}
                                                disabled={seat.number === 0}
                                                // sx={{
                                                //     '@media (max-width: 768px)': {
                                                //         rotate: '270deg',
                                                //     }
                                                // }}
                                            >
                                                {seat.number === 0 ? "X" : seat.number}
                                            </Button>
                                        );
                                    })}
                                </div>
                                {/** left side */}
                                <div className="flex flex-col-reverse gap-2 flex-wrap h-1/2 w-full">
                                    {props.travel.leftSeats.map((seat, index) => {
                                        return (
                                            <Button
                                                onClick={
                                                    seat.reservation
                                                        ? () => handleOpenPassengerInfo(seat.reservation!)
                                                        : () => handleSelectedSeat(seat.number)
                                                }
                                                key={"left_" + index}
                                                variant="contained"
                                                color={getSeatColor(seat)}
                                                disabled={seat.number === 0}
                                                sx={{
                                                    "@media (max-width: 768px)": {
                                                        width: "1px",
                                                        //height: '1rem',
                                                    },
                                                }}
                                            >
                                                {seat.number === 0 ? "X" : seat.number}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-center min-w-[15rem] max-md:hidden">
                        {/** information about selected seat*/}
                        <h6 className="font-bold text-xl">Assentos selecionados</h6>
                        {/* <Divider className="w-2/5" /> */}

                        {selectedSeats.length === 0 ? (
                            <span className="text-center text-gray-400">Selecione algum assento</span>
                        ) : (
                            <List className="w-full">
                                {selectedSeats.map((seat, index) => (
                                    <ListItem
                                        key={index}
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => handleSelectedSeat(seat)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <EventSeatIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`Assento ${seat}`} />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </div>
                </div>
                <div className="text-start w-full px-10 flex flex-row items-center gap-8 max-md:hidden">
                    <div className="flex flex-row items-center gap-2">
                        <Button className="h-8" variant="contained" color="primary" sx={{ cursor: "default" }} />
                        <span>Livre</span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Button className="h-8" variant="contained" color="secondary" sx={{ cursor: "default" }} />
                        <span>Selecionado</span>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <Button className="h-8" variant="contained" color="inherit" sx={{ cursor: "default" }} />
                        <span>Ocupado</span>
                    </div>
                </div>
                <Button
                    variant="contained"
                    disabled={selectedSeats.length === 0}
                    onClick={() => handleOpenFinishReservation()}
                    // onClick={() => {
                    //     confirm({
                    //         handleConfirm: () => handleOpenFinishReservation(),
                    //         title: "Ja é cliente?",
                    //         description: "",
                    //         cancelButtonText: "Não",
                    //         confirmButtonText: "Sim",
                    //     });

                    // }}
                >
                    Realizar Reserva(s)
                </Button>
            </div>

            {/** passenger info */}
            <Dialog
                open={reservationEditOpen}
                onClose={() => setReservationEditOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        minWidth: "20rem",
                    },
                }}
            >
                <DialogTitle>{"Informações do Passageiro"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <>
                            <span className="font-bold text-lg" key={"span_edit"}>
                                {`ASSENTO ${editReservation.seatNumber}`}
                            </span>
                            <div className="flex flex-col gap-4 w-full py-2">
                                <TextField
                                    label="Nome"
                                    variant="outlined"
                                    value={editReservation?.passengerName}
                                    onChange={(e) => {
                                        if (editReservation) {
                                            setEditReservation({
                                                ...editReservation,
                                                passengerName: e.target.value,
                                            });
                                        }
                                    }}
                                />
                                <TextField
                                    label="Cidade que mora"
                                    variant="outlined"
                                    value={editReservation?.cityThatLives}
                                    onChange={(e) => {
                                        if (editReservation) {
                                            setEditReservation({
                                                ...editReservation,
                                                cityThatLives: e.target.value,
                                            });
                                        }
                                    }}
                                />
                                {editReservation.dateOfBirth && (
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        label="Data de Nascimento"
                                        value={dayjs(editReservation.dateOfBirth)}
                                        onChange={(date) => {
                                            if (editReservation && date) {
                                                setEditReservation({
                                                    ...editReservation,
                                                    dateOfBirth: date.toISOString(),
                                                });
                                            }
                                        }}
                                        disableFuture
                                    />
                                )}
                                <TextField
                                    fullWidth
                                    label="Telefone"
                                    variant="outlined"
                                    value={editReservation.phoneNumber}
                                    onChange={(e) =>
                                        setEditReservation({ ...editReservation, phoneNumber: e.target.value })
                                    }
                                />

                                <div className="flex flex-row gap-2 items-center">
                                    <FormControl fullWidth>
                                        <InputLabel id="document-type-select-label">Documento</InputLabel>
                                        <Select
                                            labelId="document-type-select-label"
                                            value={editReservation?.identityType}
                                            label="Documento"
                                            onChange={(e) => {
                                                if (editReservation) {
                                                    setEditReservation({
                                                        ...editReservation,
                                                        identityType: e.target.value as string,
                                                    });
                                                }
                                            }}
                                        >
                                            <MenuItem value="CPF">CPF</MenuItem>
                                            <MenuItem value="RG">RG</MenuItem>
                                            <MenuItem value="CEDULA">{"CEDULA"}</MenuItem>
                                            <MenuItem value="CNH">{"CNH"}</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Número"
                                        variant="outlined"
                                        onChange={(e) => {
                                            if (editReservation) {
                                                if (e.target.value.length > 20) {
                                                    snackbar({
                                                        message: "Número de documento muito grande",
                                                        severity: "error",
                                                        delay: 5000,
                                                    });
                                                    return;
                                                }
                                                setEditReservation({
                                                    ...editReservation,
                                                    identity: e.target.value,
                                                });
                                            }
                                        }}
                                        value={editReservation.identity}
                                    />
                                </div>
                                <TextField
                                    multiline
                                    label="Observação"
                                    variant="outlined"
                                    value={editReservation.observation}
                                    onChange={(e) =>
                                        setEditReservation({ ...editReservation, observation: e.target.value })
                                    }
                                />
                            </div>
                        </>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setReservationEditOpen(false)} color="info" variant="contained">
                        {"Fechar"}
                    </Button>
                    <Button
                        onClick={(_e) =>
                            confirm({
                                handleConfirm: () => handleUpdateReservation(),
                                title: "Editar Passageiro",
                                description: "Deseja realmente editar as informações do passageiro?",
                            })
                        }
                        variant="contained"
                        color="warning"
                    >
                        {"Editar"}
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={(_e) =>
                            confirm({
                                handleConfirm: () => handleDeleteReservation(),
                                title: "Remover Passageiro",
                                description: "Deseja realmente remover o passageiro?",
                            })
                        }
                    >
                        {"Remover"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/** finish reservation */}
            <Dialog
                open={finishReservationOpen}
                onClose={() => {
                    setClientsToAdd([]);
                    setClientsReservations([]);

                    setFinishReservationOpen(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    sx: {
                        minWidth: "20rem",
                        width: "50%",
                    },
                }}
            >
                <DialogTitle>{"Realizar Reserva(s)"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className="flex flex-col gap-4">
                            {reservationsToAdd.map((reservation, index) => {
                                if (selectedSeats.includes(reservation.seatNumber)) {
                                    return (
                                        <>
                                            <span className="font-bold text-lg" key={"span_" + index}>
                                                {`ASSENTO ${reservation.seatNumber}`}
                                            </span>
                                            <div className="flex flex-col gap-4 w-full" key={"div_" + index}>
                                                <Autocomplete
                                                    disabled={clientsToAdd.includes(index)}
                                                    options={props.clients.map((c) => c.clientName)}
                                                    renderInput={(params) => (
                                                        <TextField {...params} label="Ja é cliente?" variant="filled" />
                                                    )}
                                                    onChange={(_e, value) => handleAlreadyClient(value, index)}
                                                />
                                                <TextField
                                                    disabled={clientsReservations.includes(index)}
                                                    label="Nome"
                                                    variant="outlined"
                                                    value={reservation.passengerName}
                                                    onChange={(e) => handleAddReservationPassengerName(e, index)}
                                                />
                                                <TextField
                                                    disabled={clientsReservations.includes(index)}
                                                    label="Cidade que mora (opcional)"
                                                    variant="outlined"
                                                    value={reservation.cityThatLives}
                                                    onChange={(e) => handleAddReservationCityThatLives(e, index)}
                                                />
                                                <DatePicker
                                                    disabled={clientsReservations.includes(index)}
                                                    format="DD/MM/YYYY"
                                                    label="Data de Nascimento"
                                                    value={dayjs(reservation.dateOfBirth)}
                                                    onChange={(date) => handleAddReservationDateOfBirth(date, index)}
                                                    disableFuture
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Telefone"
                                                    variant="outlined"
                                                    value={reservation.phoneNumber}
                                                    onChange={(e) => handleAddReservationPhoneNumber(e, index)}
                                                />
                                                <div className="flex flex-row gap-2 items-center">
                                                    <FormControl fullWidth>
                                                        <InputLabel id="document-type-select-label">
                                                            Documento
                                                        </InputLabel>
                                                        <Select
                                                            disabled={clientsReservations.includes(index)}
                                                            labelId="document-type-select-label"
                                                            value={reservation.identityType}
                                                            label="Documento"
                                                            defaultValue="CPF"
                                                            onChange={(e) => handleAddReservationIdentityType(e, index)}
                                                        >
                                                            <MenuItem value="CPF">CPF</MenuItem>
                                                            <MenuItem value="RG">RG</MenuItem>
                                                            <MenuItem value="CEDULA">{"CEDULA"}</MenuItem>
                                                            <MenuItem value="CNH">{"CNH"}</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <TextField
                                                        fullWidth
                                                        disabled={clientsReservations.includes(index)}
                                                        label="Número"
                                                        variant="outlined"
                                                        value={reservation.identity}
                                                        onChange={(e) => handleAddReservationIdentity(e, index)}
                                                    />
                                                </div>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={clientsToAdd.includes(index)}
                                                            onChange={(_e) => handleChangeNeedAddClient(index)}
                                                        />
                                                    }
                                                    disabled={clientsReservations.includes(index)}
                                                    label="Adicionar cliente"
                                                />
                                                <TextField
                                                    multiline
                                                    label="Observação"
                                                    variant="outlined"
                                                    value={reservation.observation}
                                                    onChange={(e) =>
                                                        setReservationsToAdd(
                                                            reservationsToAdd.map((r, i) => {
                                                                if (i === index) {
                                                                    return { ...r, observation: e.target.value };
                                                                }
                                                                return r;
                                                            })
                                                        )
                                                    }
                                                />
                                            </div>
                                            <Divider />
                                        </>
                                    );
                                }
                            })}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleAddClients} color="warning" variant="contained" disabled={clientsToAdd.length === 0}>
                        {"Adicionar Cliente(s)"}
                    </Button> */}
                    <Button
                        onClick={() => {
                            setClientsToAdd([]);
                            setClientsReservations([]);

                            setFinishReservationOpen(false);
                        }}
                        color="error"
                        variant="contained"
                    >
                        {"Cancelar"}
                    </Button>
                    <Button
                        onClick={() => handleFinishReservation()}
                        disabled={finishReservationConfirmButtonDisabled()}
                        autoFocus
                        variant="contained"
                    >
                        {"Confirmar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
