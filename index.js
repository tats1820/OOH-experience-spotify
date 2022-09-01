const express = require("express");
const { Server } = require("socket.io");
const PORT = 5050; // No cambiar, es el puerto, ngrok y este puerto deben ser iguales
const SERVER_IP = "172.30.71.152"; // Cambiar por la IP del computador

//const os = require('os');
//const IPaddress = os.networkInterfaces().en0[1].address;

const app = express();
app.use(express.json());
app.use("/app", express.static("public-app"));
app.use("/mupi", express.static("public-mupi"));

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
//pooner los eventos que necesitamos
io.on("connection", (socket) => {
  // para concetar
  console.log(socket.id);

  socket.on("device-size", (deviceSize) => {
    //tamaño del celular, lo escucho
    socket.broadcast.emit("mupi-size", deviceSize);
  });

  socket.on("mobile-instructions", (instructions) => {
    console.log(instructions, validated);
    if (instructions.rotationY < -10 && validated) {
      socket.broadcast.emit("accion 1"); //izquierda
      console.log("izquierda");
      validated = false;
      selectedLeft = true;
    } else if (instructions.rotationY > -10 && instructions.rotationY < 10) {
      validated = true;
      if (selectedLeft || selectedRight) {
        socket.broadcast.emit("next question");
      }
    } else if (instructions.rotationY > 10 && validated) {
      socket.broadcast.emit("accion 2"); // derecha
      validated = false;
      selectedRight = true;
    }

    socket.broadcast.emit("mupi-instructions", instructions);
  });
});

async function posData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
postData("http://localhost:5050/app", { mensaje: "Hola" }).then((data) => {
  console.log(data);
});
