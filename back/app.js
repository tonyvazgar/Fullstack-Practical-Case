require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnectMongo = require("./config/mongo");
const { dbConnectMySQL } = require("./config/mysql");
const swaggerUI = require("swagger-ui-express");
const openAPIconfiguration = require("./docs/swagger");

const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const port = process.env.PORT || 5000;
/**
 * Definir ruta para documentacion
 */
app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(openAPIconfiguration)
);

/*
 *  AQUI INVOCAMOS A LAS RUTAS DE TRACKS
 */
//TODO lo que va en LOCALHOST/API/****
app.use("/api", require("./routes/"));

app.use("/", (req, res) => {
  res.redirect("/documentation");
});

if (NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log("Corriendo en http://localhost:" + port);
  });
}

dbConnectMongo();

module.exports = app;
