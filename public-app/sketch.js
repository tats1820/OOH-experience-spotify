const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

let controllerX, controllerY = 0;
const interactions = 2;
let isTouched = false;

//Imágenes
let img1;
let img2;

//Pantalla inicio
let pantallas = 0;

const questions = [
    //Pregunta 1
{
    question: 'Te gusta comer',
    choices: {
        a: 'dulce',
        b: 'salado',
    },
},
    //Pregunta 2
{
    question: '¿Qué te gusta?',
    choices: {
        a: 'noche',
        b: 'dia',
    },
},
    //Pregunta 3
{
    question: '¿Qué prefieres?',
    choices: {
        a: 'calor',
        b: 'frio',
    },
},

    //Pregunta 4
{
    question: 'Si fueras un animal',
    choices: {
        a: 'gato',
        b: 'perro',
    },
},

    //Pregunta 5
{
    question: 'Te gusta más',
    choices: {
        a: 'montaña',
        b: 'playa',
    }
},

    //Pregunta 6
{
    question: 'Te gusta escuchar',
    choices: {
        a: 'pop',
        b: 'rock',
    },
},

    //Pregunta 7
    {
    question: 'Te gusta más',
    choices: {
        a: 'frutas',
        b: 'verduras',
    },
    },
]

function preload() {
    img1 = loadImage('appimages/Tutorial1.png');
    img2 = loadImage('appimages/Tutorial2.png');
}

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    //canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    background(0);
    angleMode(DEGREES);

    socket.emit('device-size', {windowWidth, windowHeight});

    let btn = createButton("Permitir movimiento");
	btn.mousePressed(function(){
		DeviceOrientationEvent.requestPermission();
        pantallas=1;
        btn.hide();
	});

}

function draw() {
    /*background(0, 5);
    newCursor(pmouseX, pmouseY);
    fill(255);
    ellipse(controllerX, controllerY, 50, 50);
    */
    switch (pantallas) {
        case 0:
            image(img1, 0, 0, windowWidth, windowHeight);
            break;

        case 1:
            image(img2, 0, 0, windowWidth, windowHeight);
            break;
    
        case 2:
            background(255,255,255);
            fill(235, 78, 54);
            rect(0,0, windowWidth/2, windowHeight);
            fill(82, 40, 75);
            rect(windowWidth/2 ,0, windowWidth/2, windowHeight);
            textAlign(CENTER, CENTER)
            fill(255, 255, 255);
            textSize(24)
            text(questions[0].choices.a, windowWidth/4, windowHeight/2);
            text(questions[0].choices.b, (windowWidth/4)*3, windowHeight/2);
            break;

        case 3:
            background(255,255,255);
            fill(255, 255, 255);
            rect(0,0, windowWidth/2, windowHeight);
            fill(82, 40, 75);
            rect(windowWidth/2 ,0, windowWidth/2, windowHeight);
            textAlign(CENTER, CENTER)
            fill(255, 255, 255);
            textSize(24)
            text(questions[1].choices.a, windowWidth/4, windowHeight/2);
            text(questions[1].choices.b, (windowWidth/4)*3, windowHeight/2);
            break;

        default:
            background(255,0,0);
            break;
    }
    
}



/*function mouseDragged() {
    socket.emit('positions', { controlX: pmouseX, controlY: pmouseY });
}*/

function touchMoved() {
    switch (interactions) {
        case 0:
            socket.emit('mobile-instructions', { interactions, pmouseX, pmouseY });
            background(255, 0, 0);
            break;
    }
}

function touchStarted(){
    isTouched = true;
}

function touchEnded(){
    isTouched = false;
}

function deviceMoved() {
    switch (interactions) {
        case 1:
            socket.emit('mobile-instructions', { interactions, pAccelerationX, pAccelerationY, pAccelerationZ });
            background(0, 255, 255);
            break;
        case 2:
                socket.emit('mobile-instructions', { interactions, rotationX, rotationY});

            /*if (pmouseX > windowWidth || pmouseX < 0){
                rotationX *= -1;
            }*/
            background(0, 255, 0);
            break;

        case 3:
    }
    
}

function deviceShaken() {
    //socket.emit('mobile-instructions', 'Moved!');
    //background(0, 255, 255);
    if (pantallas = 1) {
        pantallas = 2
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
    noStroke();
    fill(255);
    ellipse(x, y, 10, 10);
}

socket.on('next question', x => {
    pantallas+=1;
    console.log(pantallas);
});
