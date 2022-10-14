//pido la libreria
const express = require("express");
const { Server } = require("socket.io");
const { SerialPort, ReadlineParser } = require("serialport");
const PORT = 5050; // No cambiar, es el puerto, ngrok y este puerto deben ser iguales
const SERVER_IP = "192.168.0.15"; // Cambiar por la IP del computador
const bodyParser = require("body-parser");
const { response } = require("express");

//creo la app- http communication
const app = express();
app.use(express.json());
//permite
app.use("/app", express.static("public-app"));
app.use("/mupi", express.static("public-mupi"));

//serial communication
const protocolConfiguration = {
  path: "/COM3",
  baudRate: 9600,
};
const port = new SerialPort(protocolConfiguration);
const parser = port.pipe(new ReadlineParser());

//const os = require('os');
//const IPaddress = os.networkInterfaces().en0[1].address;
//172.30.56.202
//app.use(bodyParser.urlencoded({extended:false}))

//esucho el puerto
const httpServer = app.listen(PORT, () => {
  //websocket
  console.log(`http://${SERVER_IP}:${PORT}/app`);
  console.log(`http://${SERVER_IP}:${PORT}/mupi`);
});
// Run on terminal: ngrok http 5050;

const io = new Server(httpServer, { path: "/real-time" });
//serial communication working
parser.on("data", (arduinoData) => {
  let dataArray = arduinoData.split(" ");

  let arduinoMessage = {
    leftAction: dataArray[0],
    rightAction: dataArray[1],
    play: dataArray[2],
  };
  io.emit("arduinoMessage", arduinoMessage);

  console.log(arduinoMessage);
  io.broadcast.emit("mupi-instructions", instructions);
});

let validated = true; //validar de que este centrado
let selectedRight = false;
let selectedLeft = false;

//Variables para las preguntas
let total = 7;
let puntaje = 0;

//Música
let songPlaylist = [
  {
    tag: "Dulce",
    song: "Plan B - Candy",
  },
  {
    tag: "Salado",
    song: "Daddy Yankee - Gasolina",
  },
  {
    tag: "Noche",
    song: "Juanes - La camisa negra",
  },
  {
    tag: "Día",
    song: "Las ketchup - Aserejé",
  },
  {
    tag: "Calor",
    song: "Don omar - Danza kuduro",
  },
  {
    tag: "Frio",
    song: "Avicii - Levels",
  },
  {
    tag: "Gato",
    song: "Nyan Cat - Nyan",
  },
  {
    tag: "Perro",
    song: "Baha men - Who let the dogs out",
  },
  {
    tag: "Montaña",
    song: "Ricky martin - Livin' la vida loca",
  },
  {
    tag: "Playa",
    song: "OMI - Cheerleader",
  },
  {
    tag: "Pop",
    song: "Michael Jackson - Billie jean",
  },
  {
    tag: "Rock",
    song: "Linkin park - In the end",
  },
];

let respuestas = ["left", "right"];
//websocket communication
io.on("connection", (socket) => {
  socket.broadcast.emit("arduinoMessage", arduinoMessage);
  socket.on("orderForArduino", (orderForArduino) => {
    console.log("point: " + orderForArduino);
  });
  // para concetar
  console.log(socket.id);

  socket.on("device-size", (deviceSize) => {
    //tamaño del celular, lo escucho
    socket.broadcast.emit("mupi-size", deviceSize);
  });

  socket.on("nextMupiScreen", (screen) => {
    console.log(screen);
    socket.broadcast.emit("nextMupiScreen", screen);
  });

  socket.on("positions", (screen) => {
    console.log(screen);
  });

  socket.on("send songs", (userData) => {
    console.log(userData);
    let listSongs = [];
    userData.forEach((answer) => {
      songPlaylist.forEach((ti) => {
        if (ti.tag == answer) {
          listSongs.push(ti.song);
        }
      });
    });
    console.log(listSongs);
    socket.broadcast.emit("listsongs", listSongs);
  });

  socket.on("mobile-instructions", (instructions) => {
    //console.log(instructions, validated);

    socket.broadcast.emit("mupi-instructions", instructions);
  });
});

//app.post(`http://${SERVER_IP}:${PORT}/app`, (req, res, next) => {
app.post(`/lead`, (req, res, next) => {
  console.log(req.body, "THE REQUEST");
  console.log("POST");
  res.end();
});
