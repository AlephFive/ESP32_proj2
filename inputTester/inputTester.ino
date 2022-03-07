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
  Serial.println("**********************");
  Serial.println("Button Val:" + digitalRead(BTNPIN));
  Serial.println("Joy X:" + analogRead(JOY_X));
  Serial.println("Joy Y:" + analogRead(JOY_Y));
  Serial.println("POT:" + analogRead(POT));
  delay(1000);
  

  
}
