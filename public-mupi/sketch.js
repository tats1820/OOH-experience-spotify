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

//Fuente
let arialFontBold;

let controllerX,
  controllerY = 0;
let deviceWidth,
  deviceHeight = 0;
let mupiWidth,
  mupiHeight = 0;
let mupibkg, qrcode;

function preload() {
  //Mupi
  mupibkg = loadImage("mupiimages/mupi1.png");
  qrcode = loadImage("mupiimages/qr-code.png");
  mupi2 = loadImage("mupiimages/mupi2.png");
  mupi3 = loadImage("mupiimages/mupi3.png");
  mupi4 = loadImage("mupiimages/mupi4.png");
  arialFontBold = loadFont("mupiimages/ArialBold.ttf");
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
      background("#BDE94B");
      image(mupibkg, -50, -60);
      fill("#191414");
      textSize(70);
      textFont(arialFontBold);
      textAlign(LEFT, CENTER);
      text(
        "¡Dale tap a la opción que más te guste!",
        windowWidth / 6,
        windowHeight / 5,
        606,
        600
      );
      break;

    case 2:
      background("#91A0AD");
      fill("#191414");
      image(mupi2, 0, 0);
      textSize(70);
      textFont(arialFontBold);
      textAlign(LEFT, CENTER);
      text(
        "¿Qué prefieres comer?",
        windowWidth / 6,
        windowHeight / 5,
        600,
        600
      );
      break;

    case 3:
      background("#415F8A");
      fill("#191414");
      image(mupi3, 0, 0);
      textSize(70);
      textFont(arialFontBold);
      textAlign(LEFT, CENTER);
      text("¿Qué prefieres?", windowWidth / 6, windowHeight / 5, 600, 600);
      break;

    case 4:
      background("#91A0AD");
      fill("#191414");
      image(mupi4, 0, 0);
      textSize(70);
      textFont(arialFontBold);
      textAlign(LEFT, CENTER);
      text("¿Qué te gusta?", windowWidth / 6, windowHeight / 5, 600, 600);
      break;

    case 5:
      background("#91A0AD");
      fill("#191414");
      image(mupi2, 0, 0);
      textSize(70);
      textFont(arialFontBold);
      textAlign(LEFT, CENTER);
      text(
        "Si fueras un animal...",
        windowWidth / 6,
        windowHeight / 5,
        600,
        600
      );
      break;

    case 6:
      background("#F5645C");
      fill("#191414");
      image(mupi2, 0, 0);
      textSize(70);
      textFont(arialFontBold);
      textAlign(LEFT, CENTER);
      text("Te gusta más...", windowWidth / 6, windowHeight / 5, 600, 600);
      break;

    case 7:
      background("#91A0AD");
      fill("#191414");
      image(mupi2, 0, 0);
      textSize(70);
      textFont(arialFontBold);
      textAlign(LEFT, CENTER);
      text(
        "Prefieres escuchar...",
        windowWidth / 6,
        windowHeight / 5,
        600,
        600
      );
      break;

    case 8:
      //image(img8, 0, 0, windowWidth, windowHeight);
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
    if ((arduinoMessage)) {
      userData.push(questions[currentQuestion].choices.a);
      scoresong += 10;
    }
    if () {
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

socket.on("nextMupiScreen", (s) => {
  screen = s;
});

socket.on('arduinoMessage', (arduinoMessage) => {
  console.log('arduinoMessage: ')
  console.log(arduinoMessage)

  
});

socket.on('arduinoMessage', message => {
  console.log(message);
})