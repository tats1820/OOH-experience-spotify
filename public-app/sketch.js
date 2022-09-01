const NGROK = `https://${window.location.hostname}`;
console.log("Server IP: ", NGROK);
let socket = io(NGROK, { path: "/real-time" });

let controllerX,
  controllerY = 0;
const interactions = 2;
let isTouched = false;

//Imágenes
let img1;
let img2;

//Pantalla inicio
let screen = 7;
let startGameButton;

//Fuente
let arialFontBold;

const questions = [
  //Pregunta 1
  {
    question: "Te gusta comer",
    choices: {
      a: "Dulce",
      b: "Salado",
    },
  },
  //Pregunta 2
  {
    question: "¿Qué te gusta?",
    choices: {
      a: "Noche",
      b: "Dia",
    },
  },
  //Pregunta 3
  {
    question: "¿Qué prefieres?",
    choices: {
      a: "Calor",
      b: "Frio",
    },
  },

  //Pregunta 4
  {
    question: "Si fueras un animal",
    choices: {
      a: "Gato",
      b: "Perro",
    },
  },

  //Pregunta 5
  {
    question: "Te gusta más",
    choices: {
      a: "Montaña",
      b: "Playa",
    },
  },

  //Pregunta 6
  {
    question: "Te gusta escuchar",
    choices: {
      a: "Pop",
      b: "Rock",
    },
  },

  //Pregunta 7
  {
    question: "Te gusta más",
    choices: {
      a: "Frutas",
      b: "Verduras",
    },
  },
];

function preload() {
  img1 = loadImage("appimages/Tutorial1.png");
  img2 = loadImage("appimages/Tutorial2.png");
  arialFontBold = loadFont("appimages/ArialBold.ttf")
}

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  return data;
};

function startGameAction() {
  screen = 1;
  startGameButton.hide();
}

function setup() {
  frameRate(60);
  canvas = createCanvas(windowWidth, windowHeight);
  //canvas.style('z-index', '-1');
  canvas.style("position", "fixed");
  canvas.style("top", "0");
  canvas.style("right", "0");
  controllerX = windowWidth / 2;
  controllerY = windowHeight / 2;
  background(0);
  angleMode(DEGREES);

  socket.emit("device-size", { windowWidth, windowHeight });

  let btn = createButton("Permitir movimiento");
  btn.mousePressed(function () {
    DeviceOrientationEvent.requestPermission();
    screen = 1;
    btn.hide();
  });

  /*
  btn.mousePressed(function () {
    DeviceOrientationEvent.requestPermission();
  });*/

  postData(NGROK + "/info", {
    mensaje: "Hola mucho gusto",
    msg: "lalalal",
  }).then((data) => {
    console.log(data, "THE DATA");
  });
}

function draw() {
  /*background(0, 5);
    newCursor(pmouseX, pmouseY);
    fill(255);
    ellipse(controllerX, controllerY, 50, 50);
    */
  switch (screen) {
    case 0:
      socket.emit("switchScreen", screen);
      image(img1, 0, 0, windowWidth, windowHeight);
      break;

    case 1:
      image(img2, 0, 0, windowWidth, windowHeight);
      break;

    case 2:
      background(255, 255, 255);
      fill(235, 78, 54);
      rect(0, 0, windowWidth / 2, windowHeight);
      fill(82, 40, 75);
      rect(windowWidth / 2, 0, windowWidth / 2, windowHeight);
      textAlign(CENTER, CENTER);
      fill(255, 255, 255);
      textSize(24);
      textFont(arialFontBold);
      text(questions[0].choices.a, windowWidth / 4, windowHeight / 2);
      text(questions[0].choices.b, (windowWidth / 4) * 3, windowHeight / 2);
      break;

    case 3:
      background(255, 255, 255);
      fill(9, 101, 79);
      rect(0, 0, windowWidth / 2, windowHeight);
      fill(82, 40, 75);
      rect(windowWidth / 2, 0, windowWidth / 2, windowHeight);
      textAlign(CENTER, CENTER);
      fill(255, 255, 255);
      textSize(24);
      textFont(arialFontBold);
      text(questions[1].choices.a, windowWidth / 4, windowHeight / 2);
      text(questions[1].choices.b, (windowWidth / 4) * 3, windowHeight / 2);
      break;

    case 4:
      background(255, 255, 255);
      fill(36, 51, 82);
      rect(0, 0, windowWidth / 2, windowHeight);
      fill(156, 43, 123);
      rect(windowWidth / 2, 0, windowWidth / 2, windowHeight);
      textAlign(CENTER, CENTER);
      fill(255, 255, 255);
      textSize(24);
      textFont(arialFontBold);
      text(questions[2].choices.a, windowWidth / 4, windowHeight / 2);
      text(questions[2].choices.b, (windowWidth / 4) * 3, windowHeight / 2);
      break;

    case 5:
      background(255, 255, 255);
      fill(196, 202, 98);
      rect(0, 0, windowWidth / 2, windowHeight);
      fill(0, 32, 64);
      rect(windowWidth / 2, 0, windowWidth / 2, windowHeight);
      textAlign(CENTER, CENTER);
      fill(255, 255, 255);
      textSize(24);
      textFont(arialFontBold);
      text(questions[3].choices.a, windowWidth / 4, windowHeight / 2);
      text(questions[3].choices.b, (windowWidth / 4) * 3, windowHeight / 2);
      break;

    case 6:
      background(255, 255, 255);
      fill(156, 43, 123);
      rect(0, 0, windowWidth / 2, windowHeight);
      fill(255, 188, 75);
      rect(windowWidth / 2, 0, windowWidth / 2, windowHeight);
      textAlign(CENTER, CENTER);
      fill(255, 255, 255);
      textSize(24);
      textFont(arialFontBold);
      text(questions[4].choices.a, windowWidth / 4, windowHeight / 2);
      text(questions[4].choices.b, (windowWidth / 4) * 3, windowHeight / 2);
      break;

    case 7:
      background(255, 255, 255);
      fill(81, 155, 244);
      rect(0, 0, windowWidth / 2, windowHeight);
      fill(35, 51, 103);
      rect(windowWidth / 2, 0, windowWidth / 2, windowHeight);
      textAlign(CENTER, CENTER);
      fill(255, 255, 255);
      textSize(24);
      textFont(arialFontBold);
      text(questions[5].choices.a, windowWidth / 4, windowHeight / 2);
      text(questions[5].choices.b, (windowWidth / 4) * 3, windowHeight / 2);
      break;
      
    default:
      background(255, 0, 0);
      break;
  }
}

/*function mouseDragged() {
    socket.emit('positions', { controlX: pmouseX, controlY: pmouseY });
}*/

function touchMoved() {
  switch (interactions) {
    case 0:
      socket.emit("mobile-instructions", { interactions, pmouseX, pmouseY });
      background(255, 0, 0);
      break;
  }
}

function touchStarted() {
  isTouched = true;
}

function touchEnded() {
  isTouched = false;
}

function deviceMoved() {
  switch (interactions) {
    case 1:
      socket.emit("mobile-instructions", {
        interactions,
        pAccelerationX,
        pAccelerationY,
        pAccelerationZ,
      });
      background(0, 255, 255);
      break;
    case 2:
      socket.emit("mobile-instructions", {
        interactions,
        rotationX,
        rotationY,
      });

      /*if (pmouseX > windowWidth || pmouseX < 0){
                rotationX *= -1;
            }*/
      // background(0, 255, 0);
      break;

    case 3:
  }
}

function deviceShaken() {
  //socket.emit('mobile-instructions', 'Moved!');
  //background(0, 255, 255);
  if ((screen = 1)) {
    screen = 2;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
  /*  noStroke();
    fill(255);
    ellipse(x, y, 10, 10);*/
}

socket.on("next question", (x) => {
  screen += 1;
  console.log(screen);
});
