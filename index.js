//pido la libreria
const express = require("express");
const { Server } = require("socket.io");
const PORT = 5050; // No cambiar, es el puerto, ngrok y este puerto deben ser iguales
const SERVER_IP = "192.168.0.14"; // Cambiar por la IP del computador
const bodyParser = require("body-parser");

//const os = require('os');
//const IPaddress = os.networkInterfaces().en0[1].address;
//172.30.56.202
//creo la app
const app = express();
app.use(express.json());
//permite 
app.use("/app", express.static("public-app"));
app.use("/mupi", express.static("public-mupi"));
//app.use(bodyParser.urlencoded({extended:false}))

//esucho el puerto
const httpServer = app.listen(PORT, () => {
  //websocket
  console.log(`http://${SERVER_IP}:${PORT}/app`);
  console.log(`http://${SERVER_IP}:${PORT}/mupi`);
});
// Run on terminal: ngrok http 5050;

const io = new Server(httpServer, { path: "/real-time" });
let validated = true; //validar de que este centrado
let selectedRight = false;
let selectedLeft = false;

//Variables para las preguntas
let total = 7;
let puntaje = 0;

let respuestas = ["left", "right"];

io.on("connection", (socket) => {
  // para concetar
  console.log(socket.id);

  socket.on("device-size", (deviceSize) => {
    //tamaño del celular, lo escucho
    socket.broadcast.emit("mupi-size", deviceSize);
  });

  socket.on("mobile-instructions", (instructions) => {
    //console.log(instructions, validated);
    if (instructions.rotationY < -30 && validated) {
      socket.broadcast.emit("accion 1"); //izquierda
      console.log("izquierda");
      validated = false;
      selectedLeft = true;
    } else if (instructions.rotationY > -30 && instructions.rotationY < 30) {
      validated = true;
      if (selectedLeft || selectedRight) {
        socket.broadcast.emit("next question");
        console.log("siguiente pregunta");
        selectedLeft = false;
        selectedRight = false;
      }
    } else if (instructions.rotationY > 30 && validated) {
      socket.broadcast.emit("accion 2"); // derecha
      validated = false;
      selectedRight = true;
    }

    socket.broadcast.emit("mupi-instructions", instructions);
  });
});

//app.post(`http://${SERVER_IP}:${PORT}/app`, (req, res, next) => {
app.post(`/info`, (req, res, next) => {
  console.log(req.body, "TEH REQUEST");
  console.log("POST");
});
