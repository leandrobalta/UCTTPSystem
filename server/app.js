const express = require("express");
const app = express();
const sequelize = require("./config/database");
const professorRoutes = require("./routes/professorRoutes");
const courseRoutes = require("./routes/courseRoutes");
const disciplineRoutes = require("./routes/disciplineRoutes");

const cors = require("cors");

app.use(express.json());
app.use("/stp", professorRoutes);
app.use("/stp", courseRoutes);
app.use("/stp", disciplineRoutes);

app.use(cors());
sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
