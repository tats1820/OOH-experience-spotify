const NGROK = `https://${window.location.hostname}`;
let socket = io(NGROK, { path: "/real-time" });
console.log("Server IP: ", NGROK);

//Pantalla
let screen = 0;

let timeInit = Date.now();
console.log(timeInit, "----------------------------");

let imgRock, imgPop, imgGato, imgPerro, imgNoche;
let back0, back1, back2, back3, back4, back5;

//Score
let scoresong = 0;

//Fuente
let arialFontBold;

let controllerX,
  controllerY = 0;
let deviceWidth,
  deviceHeight = 0;
let mupiWidth,
  mupiHeight = 0;
let mupibkg, qrcode;

const questions = [
  //Pregunta 1
  {
    question: "La musica me lleva a momentos concretos de mi vida",
    choices: {
      a: "Si",
      b: "No",
    },
  },
  //Pregunta 2
  {
    question: "La musica de antes...",
    choices: {
      a: "Me relaja",
      b: "Me estresa",
    },
  },
  //Pregunta 3
  {
    question: "Paradise de Coldplay me hace sentir...",
    choices: {
      a: "Feliz",
      b: "Triste",
    },
  },

  //Pregunta 4
  {
    question: "Me siento más feliz cuando escucho:",
    choices: {
      a: "Gasolina",
      b: "Despecha",
    },
  },

  //Pregunta 5
  {
    question: "¿La musica Retro me da energia?",
    choices: {
      a: "Si",
      b: "No",
    },
  },

  //Pregunta 6
  {
    question: "¿La musica Aesthetic me da paz mental?",
    choices: {
      a: "Si",
      b: "No",
    },
  },

  //Pregunta 7 NO ESTÁ EN LA PLATAFORMA - BONUS
  {
    question: "¿Me siento cómodx con la música de Andres Calamaro?",
    choices: {
      a: "Si",
      b: "No",
    },
  },

  //Pregunta 8 NO ESTÁ EN LA PLATAFORMA - BONUS
  {
    question: "¿Escucharias la playlist RETROCEDAMOS EN EL TIEMPO?",
    choices: {
      a: "Si",
      b: "No",
    },
  },
];

function preload() {
  //Mupi

  qrcode = loadImage("mupiimages/qr-code.png");
  arialFontBold = loadFont("mupiimages/ArialBold.ttf");

  back0 = loadImage("mupiimages/muppi0.png");
  back1 = loadImage("mupiimages/muppi1.png");
  back2 = loadImage("mupiimages/muppi2.png");
  back3 = loadImage("mupiimages/muppi3.png");
  back4 = loadImage("mupiimages/muppi4.png");
  back5 = loadImage("mupiimages/muppi5.png");

  imgRock = loadImage("mupiimages/Rock.png");
  imgPop = loadImage("mupiimages/Dia.png");
  imgPerro = loadImage("mupiimages/Perro.png");
  imgNoche = loadImage("mupiimages/Noche.png");
  imgGato = loadImage("mupiimages/Gato.png");
  imgGato = loadImage("mupiimages/POP.png");
}
function setup() {
  //noFill();
  frameRate(60);
  canvas = createCanvas(865, 1275);
  canvas.style("z-index", "-1");
  canvas.style("position", "fixed");
  canvas.style("top", "0");
  canvas.style("right", "0");
  controllerX = windowWidth / 2;
  controllerY = windowHeight / 2;
  mupiWidth = windowWidth;
  mupiHeight = windowHeight;
}

function conicalGradient(colors) {
  let gradient = drawingContext.createConicGradient(
    PI / 2,
    windowWidth / 2,
    windowHeight / 3
  );
  gradient.addColorStop(0, colors[0] || color(0, 255, 255));
  gradient.addColorStop(1, colors[1] || color(255, 0, 255));
  drawingContext.fillStyle = gradient;

  // fill(255, 0, 0);
  rect(0, 0, windowWidth, windowHeight);
}

function textOptions(questionNumber) {
  //fill(0, 255, 0);
  textAlign(CENTER, CENTER);
  textSize(30);
  textFont(arialFontBold);
  text(questions[questionNumber].question, windowWidth / 2, windowHeight / 8);
  text(questions[questionNumber].choices.a, windowWidth / 4, windowHeight / 2);
  text(
    questions[questionNumber].choices.b,
    (windowWidth / 4) * 3,
    windowHeight / 2
  );
}

function draw() {
  switch (screen) {
    case 0:
      background("#BDE94B");

      image(back0, 0, 0);
      fill("#191414");
      textSize(70);
      textFont(arialFontBold);
      textAlign(LEFT, TOP);
      textLeading(65);
      text(
        "Descubre la canción de tu vida con NOSTALGIA",
        windowWidth / 6,
        windowHeight / 5,
        606,
        600
      );
      textSize(30);
      textAlign(CENTER, CENTER);
      textLeading(30);
      text("Presiona el botón para iniciar", windowWidth / 3, 580, 300, 600);
      break;

    case 1:
      background("#CDF564");
      image(back1, 0, 0);
      textAlign(LEFT, TOP);
      textSize(65);
      textFont(arialFontBold);
      textLeading(65);
      text(
        "Estira la mano al sensor que quieras elegir para responder la pregunta",
        windowWidth / 6,
        windowHeight / 5,
        606,
        1200
      );
      textSize(22);
      textLeading(20);
      text("Sensor izquierdo", 184, 760, 94, 48);
      text("Sensor derecho", 557, 588, 87, 48);

      break;

    case 2:
      //push();
      background(230, 30, 23);
      conicalGradient([color(0, 137, 224), color(244, 0, 47)]);
      fill("#191414");
      image(back2, 0, 0);
      textOptions(0, 0);
      textAlign(CENTER, TOP);

      break;

    case 3:
      background(230, 30, 23);
      conicalGradient([color(245, 137, 224), color(244, 87, 47)]);
      fill("#191414");
      image(back3, 0, 0);
      textOptions(1, 1);

      break;

    case 4:
      background(230, 30, 23);
      conicalGradient([color(188, 163, 205), color(144, 230, 174)]);
      fill("#191414");
      image(back4, 0, 0);
      textOptions(2, 2);
      break;

    case 5:
      background(230, 30, 23);
      conicalGradient([color((205, 245, 100), color(112, 83, 120))]);
      fill("#191414");
      image(back3, 0, 0);
      textOptions(3, 3);
      break;

    case 6:
      background(230, 30, 23);
      conicalGradient([color((255, 188, 75), color(189,233,75))]);
      fill("#191414");
      image(back2, 0, 0);
      textOptions(4, 4);
      break;

    case 7:
      background(230, 30, 23);
      conicalGradient([color((255, 90, 152), color(255, 90, 152))]);
      fill("#191414");
      image(back4, 0, 0);
      textOptions(5, 5);
      break;

    case 8:
      background("#CDF564");
      //console.log(scoresong, 'SCORE');
      let counterTime = Date.now();
      if (scoresong >= 31 && scoresong <= 49) {
        image(imgRock, 0, 0, imgRock.windowWidth, windowHeight);
      } else if (scoresong >= 50 && scoresong <= 69) {
        image(imgPop, 0, 0, windowWidth, windowHeight);
      } else if (scoresong >= 10 && scoresong <= 30) {
        image(imgGato, 0, 0, windowWidth, windowHeight);
      } else if (scoresong >= 70 && scoresong <= 150) {
        image(imgPerro, 0, 0, windowWidth, windowHeight);
      } else if (scoresong >= 70 && scoresong <= 80) {
        image(imgNoche, 0, 0, windowWidth, windowHeight);
      }
      if (timeInit + 5 * 1000 <= counterTime) {
        console.log("HOLAAAA------", {
          ti: timeInit,
          tim: timeInit + 5 * 1000,
        });
        screen = 9;
        console.log(screen, "SCREEN");
      }
      break;
    case 9:
      background("#BDE94B");
      image(back5, 0, 0);
      image(qrcode, windowWidth / 6, 500);
      fill("#191414");
      textSize(40);
      textLeading(5);
      textFont(arialFontBold);
      textAlign(LEFT, TOP);
      textLeading(65);
      text(
        "Escanea el código QR para recibir un mes gratuito de Spotify y recibir más recomendaciones de tu estilo",
        windowWidth / 6,
        windowHeight / 5,
        606,
        600
      );
      textSize(50);
      textFont(arialFontBold);
      break;

    default:
      break;
  }

  newCursor(pmouseX, pmouseY);
}

function mouseDragged() {
  socket.emit("positions", { controlX: pmouseX, controlY: pmouseY });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
  /*  noStroke();
    fill(255);
    ellipse(x, y, 10, 10);*/
}
/*
function sensorStarted() {
  if (startQuestions) {
    if (arduinoMessage) {
      userData.push(questions[currentQuestion].choices.a);
      scoresong += 10;
    }
    /*if () {
      userData.push(questions[currentQuestion].choices.b);
      scoresong += 20;
    }
    screen += 1;
    nextMupiScreen(screen);
    currentQuestion += 1;
    console.log(userData);
  }
}*/
function nextMupiScreen(screen) {
  socket.emit("nextMupiScreen", screen);
}
socket.on("mupi-instructions", (instructions) => {
  console.log("ID: " + socket.id);

  let { interactions } = instructions;
  switch (interactions) {
    case 0:
      let { pmouseX, pmouseY } = instructions;
      controllerX = (pmouseX * mupiWidth) / deviceWidth;
      controllerY = (pmouseY * mupiHeight) / deviceHeight;
      console.log({ controllerX, controllerY });
      break;
    case 1:
      /*let { pAccelerationX, pAccelerationY, pAccelerationZ } = instructions;
      ballSize = pAccelerationY < 0 ? pAccelerationY * -2 : pAccelerationY * 2;*/
      break;
    case 2:
      let { rotationX, rotationY } = instructions;
      controllerY = (rotationX * mupiHeight) / 90;
      controllerX = (rotationY * mupiWidth) / 90;
      break;
  }
});

socket.on("mupi-size", (deviceSize) => {
  let { windowWidth, windowHeight } = deviceSize;
  deviceWidth = windowWidth;
  deviceHeight = windowHeight;
  console.log(
    `User is using a smartphone size of ${deviceWidth} and ${deviceHeight}`
  );
});

socket.on("accion 1", (action) => {
  ballSize += 20;
  alert("izquierda");
  points += 5;
});

socket.on("accion 2", (action) => {
  ballSize -= 20;
  alert("derecha");
  points += 10;
});

socket.on("listsongs", (listSongs) => {
  console.log(listSongs);
});

socket.on("nextMupiScreen", () => {
  screen += 1;
});

socket.on("arduinoMessage", (arduinoMessage) => {
  console.log("arduinoMessage: ");
  console.log(arduinoMessage);
});
socket.on("selectedLeft", () => {
  console.log(screen);
  alert(questions[screen - 2].choices.a);
  scoresong += 10;
  console.log(scoresong);
  screen += 1;
  if (screen >= 8) {
    timeInit = Date.now();
    console.log("-----------", timeInit);
  }
});
socket.on("selectedRight", () => {
  alert(questions[screen - 2].choices.b);
  scoresong += 20;
  console.log(scoresong);
  screen += 1;
  if (screen >= 8) {
    timeInit = Date.now();
    console.log("-----------", timeInit);
  }
});
socket.on("arduinoMessage", (message) => {
  console.log(message);
});
