const express = require("express");
const app = express();
const sequelize = require("./config/database");
const professorRoutes = require("./routes/professorRoutes");
const courseRoutes = require("./routes/courseRoutes");
const disciplineRoutes = require("./routes/disciplineRoutes");
const userRoutes = require("./routes/userRoutes");
const classRoomRoutes = require("./routes/classroomRoutes"); 
const institutionRoutes = require("./routes/institutionRoutes");

const cors = require("cors");

const corsOptions = {
    origin: "http://127.0.0.1:5173", // URL do seu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Permitir cookies e headers autenticados
};

// Adicionar o middleware CORS antes de qualquer rota
app.use(cors(corsOptions));
app.use(express.json());
app.use("/stp", professorRoutes);
app.use("/stp", courseRoutes);
app.use("/stp", disciplineRoutes);
app.use("/stp", userRoutes);
app.use("/stp", classRoomRoutes);
app.use("/stp", institutionRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is running on http://localhost:3001");
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
