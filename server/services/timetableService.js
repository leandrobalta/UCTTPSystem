const generateTimetable = async (csv) => {
    const apiUrl = "http://localhost:1337/generate-timetable"; // URL do endpoint

    console.log(csv)

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(csv), // Envia o conteúdo do arquivo CSV no corpo da requisição
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json(); // Supõe que a resposta do servidor está no formato JSON
        console.log("Resposta do servidor:", data);

        return data; // Retorna a resposta do servidor
    } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
        throw error; // Relança o erro para quem chamou a função
    }
};

module.exports = {
    generateTimetable
};