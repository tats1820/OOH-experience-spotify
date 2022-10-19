const NGROK = `https://${window.location.hostname}`;
let socket = io(NGROK, { path: "/real-time" });
console.log("Server IP: ", NGROK);

//Pantalla
let screen = 0;
//Imágenes
let img1;
let img2; //Pantalla 1
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let img9;

let img10;
let img11;

let back0, back1, back2, back3, back4, back5, girl, boy;

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
    question: "Me siento mas comodo con un estilo retro",
    choices: {
      a: "Si",
      b: "No",
    },
  },
  //Pregunta 2
  {
    question: "¿La musica del antes?",
    choices: {
      a: "Me relaja",
      b: "Me estresa",
    },
  },
  //Pregunta 3
  {
    question: "Me siento identificada/o con: No queremos estar en el 2022, queremos estar en una epoca diferente donde no existio la pandemia",
    choices: {
      a: "Si",
      b: "No",
    },
  },

  //Pregunta 4
  {
    question: "Me siento mas feliz cuando escucho:",
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
    question: "¿Me siento comodo/a con la musica de Andres Calamaro?",
    choices: {
      a: "Si",
      b: "No",
    },
  },

  //Pregunta 8 NO ESTÁ EN LA PLATAFORMA - BONUS
  {
    question: "Paradise de Coldplay me hace sentir",
    choices: {
      a: "Feliz",
      b: "Triste",
    },
  },

  //Pregunta 9 NO ESTÁ EN LA PLATAFORMA - BONUS
  {
    question: "Si te mostramos una playlist llamada RETROCEDAMOS EN EL TIEMPO, ¿la escucharias?",
    choices: {
      a: "Si",
      b: "No",
    },
  },

  //Pregunta 10 NO ESTÁ EN LA PLATAFORMA - BONUS
  {
    question: "La musica me lleva a momentos concretos de mi vida",
    choices: {
      a: "Si",
      b: "No",
    },
  },
];

function preload() {
  //Mupi
  mupibkg = loadImage("./mupiimages/mupi1.png");
  qrcode = loadImage("mupiimages/qr-code.png");
  mupi2 = loadImage("mupiimages/mupi2.png");
  mupi3 = loadImage("mupiimages/mupi3.png");
  mupi4 = loadImage("mupiimages/mupi4.png");
  arialFontBold = loadFont("mupiimages/ArialBold.ttf");

  boy = loadImage("appimages/boy.png");
  girl = loadImage("appimages/girl.png");
  back0 = loadImage("appimages/back0.png");
  back1 = loadImage("appimages/back1.png");
  back2 = loadImage("appimages/back2.png");
  back3 = loadImage("appimages/back3.png");
  back4 = loadImage("appimages/back4.png");
  back5 = loadImage("appimages/back5.png");
  logo = loadImage("svgimages/logo.svg");
}

function setup() {
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
  background(0);

  /*imageMode("center");
  image(img1, windowWidth / 2, windowHeight / 2, 550, 800);
  console.log(img1, img1.width / 2, img1.height / 2);
  */
}

function conicalGradient(colors) {
  let gradient = drawingContext.createConicGradient(
    PI / 2,
    windowWidth / 2,
    windowHeight / 3
  );
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  drawingContext.fillStyle = gradient;
}

function textOptions(questionNumber) {
  textAlign(CENTER, CENTER);
  textSize(24);
  textFont(arialFontBold);
  text(questions[questionNumber].choices.a, windowWidth / 4, windowHeight / 2);
  text(
    questions[questionNumber].choices.b,
    (windowWidth / 4) * 3,
    windowHeight / 2
  );
}

function draw() {
  /*background(0, 5);
    newCursor(pmouseX, pmouseY);
    fill(255);
    ellipse(controllerX, controllerY, ballSize, ballSize);
    */

  switch (screen) {
    case 0:
      background("#BDE94B");
      image(mupibkg, -50, -60);

      image(qrcode, windowWidth / 6, windowHeight / 5 + 380, 200, 200);
      fill("#191414");
      textSize(70);
      textFont(arialFontBold);
      textAlign(LEFT, TOP);
      text(
        "Descubre la canción de tu vida con Nostalgia",
        windowWidth / 6,
        windowHeight / 5,
        606,
        600
      );
      break;

    case 1:
      background("#CDF564");
      image(back1, -60, -80);
      textAlign(LEFT, TOP);
      textSize(32);
      textFont(arialFontBold);
      text("¡Dale tap a la opción que más te guste!", 50, 200, 238, 354);
      image(girl, windowWidth / 8, windowHeight / 3);
      image(logo, windowWidth / 8, windowHeight / 1.1);
      break;

    case 2:
      conicalGradient(
        [color(205, 245, 100), color(84, 73, 245)],
        rect(0, 0, windowWidth, windowHeight)
      );
      image(back3, -60, -50);
      textOptions(0, 0);

      break;

    case 3:
      conicalGradient(
        [color(245, 137, 224), color(244, 87, 47)],
        rect(0, 0, windowWidth, windowHeight)
      );
      image(back2, -60, -50);
      textOptions(1, 1);

      break;

    case 4:
      conicalGradient(
        [color(39, 51, 125), color(144, 230, 174)],
        rect(0, 0, windowWidth, windowHeight)
      );
      image(back4, -60, -50);
      textOptions(2, 2);
      break;

    case 5:
      conicalGradient(
        [color(205, 245, 100), color(112, 83, 120)],
        rect(0, 0, windowWidth, windowHeight)
      );
      image(back3, -50, -50);
      textOptions(3, 3);
      break;

    case 6:
      conicalGradient(
        [color(255, 188, 75), color(237, 24, 161)],
        rect(0, 0, windowWidth, windowHeight)
      );
      image(back2, -60, -50);
      textOptions(4, 4);
      break;

    case 7:
      conicalGradient(
        [color(244, 87, 47), color(112, 83, 120)],
        rect(0, 0, windowWidth, windowHeight)
      );
      image(back4, -60, -50);
      textOptions(5, 5);
      break;

    case 8:
      background("#CDF564");
      if (scoresong === 120) {
        image(imgRock, 0, 0, windowWidth, windowHeight);
      } else if (scoresong === 60) {
        image(imgPop, 0, 0, windowWidth, windowHeight);
      } else if (scoresong === 80) {
        image(imgGato, 0, 0, windowWidth, windowHeight);
      } else if (scoresong === 110) {
        image(imgPerro, 0, 0, windowWidth, windowHeight);
      } else if (scoresong === 70) {
        image(imgNoche, 0, 0, windowWidth, windowHeight);
      }

      {
      }
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
function sensorStarted() {
  if (startQuestions) {
    if (arduinoMessage) {
      userData.push(questions[currentQuestion].choices.a);
      scoresong += 10;
    }
    /*if () {
      userData.push(questions[currentQuestion].choices.b);
      scoresong += 20;
    }*/
    screen += 1;
    nextMupiScreen(screen);
    currentQuestion += 1;
    console.log(userData);
  }
}
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
  screen += 1;
});
socket.on("selectedRight", () => {
  alert(questions[screen - 2].choices.b);
  screen += 1;
});
socket.on("arduinoMessage", (message) => {
  console.log(message);
});
