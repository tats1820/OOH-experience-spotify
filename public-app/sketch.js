const NGROK = `https://${window.location.hostname}`;
console.log("Server IP: ", NGROK);
let socket = io(NGROK, { path: "/real-time" });

let controllerX,
  controllerY = 0;
const interactions = 2;
let isTouched = false;

//Score
let scoresong = 0;

//Imágenes
let img1;
let img2;
let imgDia;
let imgNoche;
let imgCalor;
let imgFrio;
let imgDulce;
let imgSalado;
let imgMontaña;
let imgPlaya;
let imgPop;
let imgRock;
let imgGato;
let imgPerro;

//Canciones
let cancionDulce;
let cancionSalado;
let cancionNoche;
let cancionDia;
let cancionCalor;
let cancionFrio;
let cancionGato;
let cancionPerro;
let cancionMontaña;
let cancionPlaya;
let cancionPop;
let cancionRock;

//Pantalla inicio
let screen;
let startGameButton;
let instructionsButton;
let saveUserdataButton;
let userData = [];
let inputNickname;
let inputGmail;
let inputAge;

//botón para empezar
function startGameButtonAction() {
  screen += 1;
  nextMupiScreen(screen);
  //instructionsButton.hide();
  if (screen == 2) {
    startGameButton.hide();
    setTimeout(() => {
      startQuestions = true;
    }, 2000);
  }
}
//botón para ir a instrucciones
function instructionsButtonAction() {
  screen = 1;
  startGameButton.show();
  instructionsButton.hide();
}

function finalScreen(){
  screen = 10;
  saveUserdataButton.hide();
  imputNickname.hide();
  imputGmail.hide();
  imputUserDataButton.hide();
}

function saveUserData() {
  postData(NGROK + "/lead", newLead).then((data) => {
    console.log(data, "THE DATA");
  });
  console.log(newLead);
}
function onInputNickname() {
  newLead.nickname = this.value();
  console.log(this.value());
}
function onInputGmail() {
  newLead.gmail = this.value();
  console.log(this.value());
}
function onInputAge() {
  newLead.age = this.value();
  console.log(this.value());
}

//Fuente
let arialFontBold;

let startQuestions = false;
let currentQuestion = 0;
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

  //Pregunta 7 NO ESTÁ EN LA PLATAFORMA - BONUS
  {
    question: "Te gusta más",
    choices: {
      a: "Frutas",
      b: "Verduras",
    },
  },
];

let newLead = {
  nickname: "",
  gmail: "",
  age: "",
};

let back0, back1, back2, back3, back4, back5, girl, boy;

function preload() {
  
  arialFontBold = loadFont("svgimages/ArialBold.ttf");

  
  logo = loadImage("svgimages/logo.svg");


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



function setup() {
  screen = 9;
  frameRate(60);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("position", "fixed");
  canvas.style("top", "0");
  canvas.style("right", "0");

  controllerX = windowWidth / 2;
  controllerY = windowHeight / 2;
  background(0);
  angleMode(DEGREES);

  socket.emit("device-size", { windowWidth, windowHeight });



  saveUserDataButton = createButton(
    '<i class="material-icons">check_circle</i>'
  );
  saveUserDataButton.position(windowWidth / 2.5, windowHeight / 1.5);
  saveUserDataButton.child('<i class="material-icons">cloud</i>');
  saveUserDataButton.addClass("btn");

  saveUserDataButton.mousePressed(saveUserData);
  saveUserDataButton.mousePressed(finalScreen);
  saveUserDataButton.style("display", "none");
  inputNickname = createInput("", "text");
  inputNickname.attribute("placeholder", "Nickname");
  inputNickname.position(windowWidth / 4, windowHeight / 2.9);
  inputNickname.input(onInputNickname);
  inputNickname.addClass("input");
  inputNickname.style("display", "none");

  inputGmail = createInput("", "text");
  inputGmail.attribute("placeholder", "Gmail");
  inputGmail.position(windowWidth / 4, windowHeight / 2.9 + 50);
  inputGmail.input(onInputGmail);
  inputGmail.addClass("input");
  inputGmail.style("display", "none");

  inputAge = createInput("", "text");
  inputAge.attribute("placeholder", "Age");
  inputAge.position(windowWidth / 4, windowHeight / 2.9 + 100);
  inputAge.input(onInputAge);
  inputAge.addClass("input");
  //inputAge.style("display", "none");
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
  switch (screen) {
    case 0:
      background("#CDF564");
      image(back0, -40, -40);
      textAlign(LEFT, TOP);
      textSize(50);
      textFont(arialFontBold);
      text("¡Juguemos This or That!", windowWidth / 8, 50, 300, 300);
      textSize(24);
      text("Elige la opción que más prefieras", 50, 250, 238, 54);

      inputNickname.hide();
      inputGmail.hide();
      inputAge.hide();
      saveUserDataButton.hide();
      image(boy, windowWidth / 4.5, windowHeight / 1.8);
      image(logo, windowWidth / 8, windowHeight / 1.1);
      // image(doodle1, 200, 100, doodle1.width, doodle1.height);
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
      socket.emit("send songs", userData);
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
    case 9:
      background("#CDF564");
      
      

      inputNickname.style("display", "block");
      inputGmail.style("display", "block");
      inputAge.style("display", "block");
      saveUserDataButton.style("display", "block");
      image(logo, windowWidth / 8, windowHeight / 1.1);
      break;

    case 10:
      background("#CDF564");
      textAlign(CENTER, CENTER);
      textSize(24);
      textFont(arialFontBold);
      text(
          "¡Tus datos se han registrado correctamente!",
          50,
          windowHeight / 11,
          238,
          354
        );
        break;
    default:
      background(29, 185, 84);
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
/*
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
      break;

    case 3:
  }
}

function deviceShaken() {}
*/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




function mousePressed() {
  if (startQuestions) {
    if ((mouseX > 0) & (mouseX < windowWidth / 2)) {
      userData.push(questions[currentQuestion].choices.a);
      scoresong += 10;
    }
    if ((mouseX < windowWidth) & (mouseX > windowWidth / 2)) {
      userData.push(questions[currentQuestion].choices.b);
      scoresong += 20;
    }
    screen += 1;
    nextMupiScreen(screen);
    currentQuestion += 1;
    console.log(userData);
    console.log(scoresong);
  }
}

function touchStarted() {
  if (startQuestions) {
    if ((mouseX > 0) & (mouseX < windowWidth / 2)) {
      userData.push(questions[currentQuestion].choices.a);
      scoresong += 10;
    }
    if ((mouseX < windowWidth) & (mouseX > windowWidth / 2)) {
      userData.push(questions[currentQuestion].choices.b);
      scoresong += 20;
    }
    screen += 1;
    nextMupiScreen(screen);
    currentQuestion += 1;
    console.log(userData);
  }
}

function nextMupiScreen(screen) {
  socket.emit("nextMupiScreen", screen);
}
