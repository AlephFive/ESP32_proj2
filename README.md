# ESP32_proj2

There are two parts to this project. The ESP32 code, which sends controller data to the computer via serial, and the Loading Simulator 2022 game itself, which interprets the controller data and responds to it.

### Loading Simulator 2022 interface
![Loading screen](https://user-images.githubusercontent.com/6265129/157605167-266e482e-3f3b-49db-b4cd-2dffccc8f89a.jpg)

### Controller
![PXL_20220310_053957084](https://user-images.githubusercontent.com/6265129/157605463-1f0cfcb0-42dd-4470-8b3b-6d4e4f52e94a.jpg)
![PXL_20220310_054018956](https://user-images.githubusercontent.com/6265129/157605483-61067e94-b514-43bd-8122-a84fa1742c05.jpg)


## How to run Loading Simulator 2022
To run Loading Simulator 2022, simply open "index.html" in a browser that supports web serial e.g. Google Chrome. The system accepts data in JSON format with 4 data fields so you can build your own custom controller:
```
{
  "b": Button value of 0 or 1,
  "x": Joystick X value from 0 to 4095,
  "y": Joystick Y value from 0 to 4095,
  "p": Potentiometer value from 0 to 4095
}
```

When you open Loading Simulator, click on the top left corner to open a list of serial ports. Once you select a port, the system can receive controller data.

#### Controls
Pressing the Button displays a random loading message.
Moving the joystick up and down moves the loading bar up and down.
Moving the joystick left and right increases the loading progress asymptotically towards 100%.
Turning the potentiometer changes the loading bar "redness".


## How to run ESP32 code:
The ESP32 code constantly sends sensor data via serial every 10ms. Pin number and connected components are as follows:

![PXL_20220307_210900644](https://user-images.githubusercontent.com/6265129/157605316-7e253796-1d6b-4689-ac29-9e982f3b22d1.jpg)

We are using the Arduino IDE. To enable IDE support for the ESP32, first open up Preferences and under "Additional Boards Manager URLs", add the following URL:
```
https://dl.espressif.com/dl/package_esp32_index.json
```
![BoardsManagerURL](https://user-images.githubusercontent.com/6265129/153997561-184baff3-dad6-4699-b3ea-dfbc9214f8ea.jpg)

Then, go to "Tools/Board:/Board Manager" and install ESP32:

![BoardsManager](https://user-images.githubusercontent.com/6265129/153997769-d04a40cc-fc14-4832-a115-e32f032be1a6.jpg)

Then, go to "Tools/Manage Libraries" and search for tft_eSPI. Install it.

![ManageLibs](https://user-images.githubusercontent.com/6265129/153997596-e524be05-fd41-4741-9025-56ad5be9ab33.jpg)

After that, go to "Tools/Board:" and select "TIGO T1".

![BoardSelect](https://user-images.githubusercontent.com/6265129/153997616-e5988c80-6d34-4566-b800-3d8c03f9ffd7.jpg)

Now, simply connect your board and click upload.
