import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { TimetableService } from "../services/timetable.service";
import { useNavigate } from "react-router-dom";
import { useConfirm, useSnackbar } from "../hooks/use-alert-utils";
import { useLoading } from "../hooks/use-loading";

export function HomePage() {
    const navigate = useNavigate();
    const { snackbar } = useSnackbar();
    const { setLoading } = useLoading();
    const { confirm } = useConfirm();

    const [timetable, setTimetable] = useState<any>();
    const [days, setDays] = useState<any>();
    const [times, setTimes] = useState<any>();

    const translateDays: Record<string, string> = {
        Monday: "Segunda",
        Tuesday: "Terça",
        Wednesday: "Quarta",
        Thursday: "Quinta",
        Friday: "Sexta",
        Saturday: "Sábado",
        Sunday: "Domingo",
    };

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

            const response = await TimetableService.getTimetable(navigate, fileContent);

            if (!response.success) {
                snackbar({
                    severity: "error",
                    message: response.message,
                    delay: 5000,
                });
            } else if (response.data) {
                const weekDaysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

                setTimetable(response.data);
                setDays(Object.keys(response.data).sort((a, b) => weekDaysOrder.indexOf(a) - weekDaysOrder.indexOf(b)));
                setTimes(
                    Array.from(
                        new Set(
                            Object.values(response.data)
                                .flat()
                                .map((entry: any) => entry.time)
                        )
                    )
                );
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

    const handleExport = () => {
        if (!timetable || !days || !times) {
            snackbar({
                severity: "error",
                message: "Nenhuma tabela para exportar",
                delay: 5000,
            });
            return;
        }

        const translateDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

        let csvContent = "Horário," + translateDays.join(",") + "\n";

        times.forEach((time: string) => {
            const row = [time];
            days.forEach((day: string) => {
                const entry = timetable[day].find((d: any) => d.time === time);
                row.push(entry?.disciplines?.join("; ") || "-");
            });
            csvContent += row.join(",") + "\n";
        });

        // Cria um arquivo Blob para download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        // Cria um link para download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "timetable.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4 gap-4">
            {/* Importar CSV */}
            <div className="flex flex-col gap-4 items-start bg-white shadow-md rounded-lg p-6 border border-gray-200">
                <span className="text-lg font-bold text-gray-800">Importar Grade Horária (CSV):</span>
                <input
                    type="file"
                    accept=".csv"
                    className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    onChange={(e) =>
                        confirm({
                            title: "Confirmação",
                            description: `Tem certeza que deseja enviar o arquivo?`,
                            handleConfirm: () => handleFileUpload(e),
                        })
                    }
                />
            </div>

            {timetable && (
                <div className="flex flex-col p-4 gap-4 max-w-8xl mx-auto bg-white shadow-lg rounded-lg">
                    {/* Título com estilização */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-blue-500 pb-2">
                            Grade Horária Semanal
                        </h1>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleExport}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                        >
                            <span>Exportar para CSV</span>
                        </Button>
                    </div>

                    {/* Tabela com overflow horizontal */}
                    {timetable && (
                        <TableContainer
                            component={Paper}
                            className="shadow-lg rounded-lg overflow-x-auto border border-gray-200"
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Horário</TableCell>
                                        {days.map((day: string) => (
                                            <TableCell
                                                key={day}
                                                sx={{
                                                    fontWeight: "bold",
                                                    textAlign: "center",
                                                    backgroundColor: "#f0f0f0",
                                                }}
                                            >
                                                {translateDays[day] || day}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {times.map((time: string) => (
                                        <TableRow key={time}>
                                            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#fafafa" }}>
                                                {time}
                                            </TableCell>
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
            )}
        </div>
    );
}
