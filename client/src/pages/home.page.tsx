import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import timetableData from "../utils/schedules.json";
import { TimetableService } from "../services/timetable.service";
import { useNavigate } from "react-router-dom";
import { useConfirm, useSnackbar } from "../hooks/use-alert-utils";
import { useLoading } from "../hooks/use-loading";
import { time } from "console";
import { TimeTableModel } from "../models/timetable.model";

export function HomePage() {
    const navigate = useNavigate();
    const { snackbar } = useSnackbar();
    const { setLoading } = useLoading();
    const { confirm } = useConfirm();

    const [timetable, setTimetable] = useState<any>();

    let days: any;
    let times: any;

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            snackbar({
                severity: "error",
                message: "Nenhum arquivo selecionado",
                delay: 5000,
            });
            return;
        }

        setLoading(true);

        try {
            const fileContent = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = () => reject(new Error("Erro ao ler o arquivo"));
                reader.readAsText(file); // Lê o conteúdo como texto
            });

            // Faz a requisição enviando o conteúdo do arquivo
            const response = await TimetableService.getTimetable(navigate, fileContent);

            if (!response.success) {
                snackbar({
                    severity: "error",
                    message: response.message,
                    delay: 5000,
                });
            } else if (response.data) {
                setTimetable(response.data);
                const days = Object.keys(response.data);
                const times = Array.from(
                    new Set(days.flatMap((day: string) => response.data[day].map((entry: any) => entry.time)))
                );

                console.log("Days:", days);
                console.log("Times:", times);
            }
        } catch (error) {
            snackbar({
                severity: "error",
                message: "Erro ao processar o arquivo",
                delay: 5000,
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col p-4 gap-2">
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Grade Horária Semanal</h1>
            <div className="flex flex-row gap-2 items-center">
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) =>
                        confirm({
                            title: "Confirmação",
                            description: `Tem certeza que deseja enviar o arquivo?`,
                            handleConfirm: () => handleFileUpload(e),
                        })
                    }
                />
            </div>{" "}
            {timetable && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Horário</TableCell>
                                {days.map((day: string) => (
                                    <TableCell key={day} sx={{ fontWeight: "bold", textAlign: "center" }}>
                                        {day}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {times.map((time: string) => (
                                <TableRow key={time}>
                                    <TableCell>{time}</TableCell>
                                    {days.map((day: string) => {
                                        const entry = timetable[day].find((d: any) => d.time === time);
                                        return (
                                            <TableCell key={day} style={{ whiteSpace: "pre-line" }}>
                                                {entry?.disciplines?.join("\n") || "-"}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}
