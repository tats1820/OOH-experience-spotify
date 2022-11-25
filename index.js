//pido la libreria
const express = require("express"); //protocolo http
const { Server } = require("socket.io"); //webscokets
const cors = require("cors");
const { FireStoreDB } = require("./firebase-config.js"); //llamo librería de firestore

const leadsCollection = new FireStoreDB("Leads");
const interactionCollection = new FireStoreDB("Interactions");
//const leadsCollection = new FireStoreDB("Leads");
const { SerialPort, ReadlineParser } = require("serialport");
const PORT = 5050; // No cambiar, es el puerto, ngrok y este puerto deben ser iguales
const SERVER_IP = "192.168.20.23"; // Cambiar por la IP del computador
const bodyParser = require("body-parser");
const { response } = require("express");

//creo la app- http communication
const app = express();
app.use(cors({ origin: "*" }));
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
const parser = port.pipe(new ReadlineParser()); //Para traducir la informacion que manda el arduino

//esucho el puerto
const httpServer = app.listen(PORT, () => {
  //websocket
  console.log(`http://${SERVER_IP}:${PORT}/app`);
  console.log(`http://${SERVER_IP}:${PORT}/mupi`);
});
// Run on terminal: ngrok http 5050;

const io = new Server(httpServer, { path: "/real-time" });
//serial communication working

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
let screens = 0;
let respuestas = ["left", "right"];

//websocket communication
parser.on("data", (arduinoData) => {
  let dataArray = arduinoData.split(" ");

  let arduinoMessage = {
    leftAction: dataArray[0],
    rightAction: dataArray[1],
    play: dataArray[2],
  };

  if ((arduinoMessage.play = "y" && screens <= 1)) {
    screens += 1;

    io.emit("nextMupiScreen");
    console.log("sensor activado");
  }
  if (arduinoMessage.leftAction != 0 && selectedLeft == false && screens > 1) {
    screens += 1;
    selectedLeft = true;
    io.emit("selectedLeft");
    console.log("sensor activado");
    selectedLeft = false;
  }
  if (
    arduinoMessage.rightAction != 0 &&
    selectedRight == false &&
    screens > 1
  ) {
    screens += 1;
    selectedRight = true;
    io.emit("selectedRight");
    console.log("sensor activado");
    selectedRight = false;
  }
  console.log(arduinoMessage);
});

io.on("connection", (socket) => {
  // socket.broadcast.emit("arduinoMessage", arduinoMessage);

  // para concetar
  console.log(socket.id);

  socket.on("device-size", (deviceSize) => {
    //tamaño del celular, lo escucho
    socket.broadcast.emit("mupi-size", deviceSize);
  });
  /*
  if (selectedLeft) {
    selectedLeft = false;
    socket.emit("nextMupiScreen", screens);
    console.log("mensaje enviado");
  }*/
  socket.on("nextMupiScreen", (screen) => {
    console.log(screen);
    socket.broadcast.emit("nextMupiScreen", screen);
  });

  socket.on("positions", (screen) => {
    console.log(screen);
  });

  socket.on("mobile-instructions", (instructions) => {
    //console.log(instructions, validated);

    socket.broadcast.emit("mupi-instructions", instructions);
  });
});

//guardar datos de los lead a través de un post
/*
app.post(`/lead`, (req, res, next) => {
  console.log(req.body, "THE REQUEST");
  console.log("POST");
  res.end();
});
*/

app.get("/Leads", (request, response) => {
  timeStamp();
  interactionCollection.getCollection().then((leads) => {
    console.log(leads);
    response.send(leads);
  });
});

app.post("/add-new-lead", (request, response) => {
  timeStamp();
  console.log("Before timeStamp: ");
  console.log(request.body);
  console.log("After timeStamp: ");
  request.body.timestamp = timeStamp();
  console.log(request.body);
  //agrega doc en firestore
  interactionCollection.addNewDocument(request.body);
  response.status(200).end();
});

function timeStamp() {
  let date = new Date();
  let [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
  ];
  let [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  console.log(`${hour}:${minutes}:${seconds} - ${month}/${day}/${year}`);
  return `${hour}:${minutes}:${seconds} - ${month}/${day}/${year}`;
}
