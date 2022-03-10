/*
This is an example how to use Touch Intrrerupts and read touch values
*/

const int BTNPIN = 32;
const int JOY_X = 2;
const int JOY_Y = 15;
const int POT = 27;


void setup() {
  Serial.begin(115200);
  delay(1000); // give me time to bring up serial monitor
  Serial.println("ESP32 Touch Interrupt Test");


  //button
  pinMode(BTNPIN, INPUT_PULLDOWN);

  //joystick

}

void loop(){
  //Serial.println("**********************");
  Serial.println("{\"b\":" + String(digitalRead(BTNPIN))+ ",\"x\":" + String(analogRead(JOY_X)) + ",\"y\":" + String(analogRead(JOY_Y)) + ",\"p\":" + String(analogRead(POT)) + "}");
  //Serial.println("Joy X:" + );
  //Serial.println("Joy Y:" + String(analogRead(JOY_Y)));
  //Serial.println("POT:" + String(analogRead(POT)));
  delay(50);
  

  
}
