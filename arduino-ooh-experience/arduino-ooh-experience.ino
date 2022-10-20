

const int triggerLeft = 7; //Trigger pin del sensor izq blanco
const int echoLeft = 6; //Echo pin del sensor izq azul

const int triggerRight = 5; //Trigger pin del sensor der amarillo
const int echoRight = 4;//Echo pin of 2nd del sensor der anaranjado

const int btnPin = 8;

const int ledPin= 10;

bool btnState = false;
bool isPressed = false;

long duration; //variable para la duración de la onda de sonido
int distance,distanceLeft, distanceRight; //variables para la medida de distancia
//distanceRight;


void setup() {

pinMode(triggerLeft, OUTPUT); 
pinMode(echoLeft, INPUT); 

pinMode(triggerRight, OUTPUT); 
pinMode(echoRight, INPUT); 

pinMode(btnPin, INPUT);
pinMode(ledPin, OUTPUT);
Serial.begin(9600); 
/*
*/
}


//función para calcular la distancia
void getDistance(int trigger, int echo)
{
//limpia la condición de triggerLeft/Right
digitalWrite(trigger, LOW);
delayMicroseconds(2);
//el trigger está activo por 10 microsegundos
digitalWrite(trigger, HIGH);
delayMicroseconds(10);
digitalWrite(trigger, LOW);
//lee la duración del pin echo, devuelve la onda de sonido en microsegundos
duration = pulseIn(echo, HIGH);
//distancia de la onda de sonida dividida por 2(va y vuelve)
distance = duration*0.034/2;

if (distance > 30)
distance = 30;

}
void loop(){
  sendingData();
  /*
  if (Serial.available() > 0) {
    receivingData();
  } else {
    sendingData();
  }
  delay(10);*/
  delay(500);
}
void send(int left, int right, char play){
  Serial.print(left);
  Serial.print(' ');
   Serial.print(right);
  Serial.print(' ');
   Serial.print(play);
  Serial.print(' ');
  Serial.println();

}
void sendingData(){
btnState = digitalRead(btnPin);

if(btnState && !isPressed){
  send(0, 0, 'play');
  isPressed = true;
  digitalWrite(ledPin, HIGH);
}else if(!btnState && isPressed){
  isPressed = false;
  digitalWrite(ledPin, LOW);
}

 getDistance(triggerLeft,echoLeft); 
 distanceLeft = distance;
  if ((distanceLeft > 1 && distanceLeft <15)){
//sendSerialMessage(distanceLeft);
//Serial.print("Distance range left: ");
send(distanceLeft, 0, ' ');
//Serial.print(distanceLeft);  
//Serial.println(" cm");
}

 getDistance(triggerRight,echoRight); 
 distanceRight = distance;
 if ((distanceRight > 1 && distanceRight <15)){
//sendSerialMessage(distanceRight);
//Serial.print("Distance range right: ");
send(0, distanceRight, ' ');

}

/*
if ((distanceLeft > 1 && distanceRight > 1) && (distanceLeft < 15 && distanceRight < 15)){ //detecta ambas manos
send(0, 0, 'play');
*/


//Serial.print("play");
//if ((distanceLeft > 40 && zz > 40) && (distanceLeft < 50 && distanceRight < 50)) //detecta ambas manos


delay (100);
}
/*
void receivingData() {

  char inByte = Serial.read();

  switch (inByte) {
    case 'Left':

     Serial.print('Left detected');
      break;
    case 'Right':
     Serial.print('Right detected');
      break;
  }
  Serial.flush();
}*/
/*

void loop() { //infinite loopy
getDistance(triggerLeft,echoLeft);

distanceLeft = distance; //toma la distancia del sensor izq

getDistance(triggerRight,echoRight);
distanceRight = distance;

Serial.print("distanceLeft = ");
Serial.println(distanceLeft);

//Serial.print("Right = ");
//Serial.println(distanceRight);

//modo play
if ((distanceLeft > 1 && distanceLeft <15)){
//if ((distanceLeft > 40 && distanceRight > 40) && (distanceLeft < 50 && distanceRight < 50)) //detecta ambas manos

Serial.print("Distance range: ");
Serial.print(distanceLeft);
Serial.println(" cm");
delay (500);
}

}
*/

//getDistance(triggerLeft,echoLeft);
//distanceLeft = distance;
/*
duration(triggeRight,echoRight);
distanceRight = distance;
*/

//Control Modes

//Lock Left - Control Mode
/*if (distanceLeft>=13 && distanceLeft<=17)

{

  delay(100); //tiempo sostenido
  getDistance(triggerLeft,echoLeft);

  distanceLeft = distance;

  if (distanceLeft>=13 && distanceLeft<=17){
    Serial.println("Left Locked");

    while(distanceLeft<=40){
      getDistance(triggerLeft,echoLeft);
      distanceLeft = distance;

      if (distanceLeft<10) //Hand pushed in 
      {Serial.println ("a"); delay (300);}

      if (distanceLeft>20) //Hand pulled out
      {Serial.println ("abajo"); delay (300);}

    }
  }
}

//Lock Right - Control Mode
/*
if (distR>=13 && distR<=17)

{

  delay(100); //Hand Hold Time

  calculate_distance(trigger2,echo2);

  distR =dist;

  if (distR>=13 && distR<=17)

  {

    Serial.println("Right Locked");

    while(distR<=40)

    {

      calculate_distance(trigger2,echo2);

      distR =dist;

      if (distR<10) //Right hand pushed in

      {Serial.println ("Rewind"); delay (300);}

      if (distR>20) //Right hand pulled out

      {Serial.println ("Forward"); delay (300);}

  }

}

delay(2000);

}
}*/
