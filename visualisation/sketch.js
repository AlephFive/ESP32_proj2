var progress;
var ww;
var loading_max_width;

var loading_x;
var loading_y;

var serialConnected = false;
var port;
var ports;
//var reader;

var controllerData = {"b":0,"x":1905,"y":1925, "p":0};

var vert = 0;
var func_input = 0.0;
var curr_btn = 0;
var msg_index = Math.floor(Math.random() * 10);
var msgs = [
	"Dividing by zero",
	"Making hamsters run faster",
	"Solving Fermat's Last Theorem",
	"Generating Universe",
	"???????????????",
	"Hotfixing the game",
	"Autobuying DLC",
	"Creating Microtransactions",
	"a",
	"lol"
];

function setup() {
	progress = 0.5;
	let wh = windowHeight - 100
	ww = wh
	createCanvas(wh,wh); // make an HTML canvas element width x height pixels

	document.title = "Loading...";

	loading_max_width = ww - 9;

	//serial = new p5.SerialPort(); // make a new instance of the serialport library
	//serial.on('list', printList); // set a callback function for the serialport list event
	
	//serial.list(); // list the serial ports

	button = createButton('Connect');
	button.position(0, 0);
	button.mousePressed(connectSerial);
	
}

function draw() {
	background(255);
	fill(0);

	//draw loading bar


	//modify vertical height
	let vert_mod = ((controllerData["x"]/4095) - 0.5)*30;

	//modify progress
	if(controllerData["y"] >= 1940){
		func_input += (controllerData["y"]/4095 - 0.5)*0.01;
	}
	else if(func_input > 0) {
		func_input += (controllerData["y"]/4095 - 0.5)*0.01;
		if (func_input < 0) func_input = 0;
	}

	let progress_func = (2/Math.PI)* Math.atan((Math.PI*func_input)/2);


	//randomise if button pressed
	if(curr_btn === 0 && controllerData["b"] != 0){
		curr_btn = 1;
		msg_index = Math.floor(Math.random() * 10);
	}
	else{
		curr_btn = controllerData["b"];
	}

	

	rect(0 , 300 + vert_mod, ww, 200);
	fill(255);
	rect(3 , 303 + vert_mod, ww-6, 194);

	let color = (controllerData["p"]/4095) * 230;
	
	fill(color,0,0);
	rect(6 , 306 + vert_mod, (ww-12)*progress_func, 188);
	
	textAlign(LEFT);
	fill(0);
	textSize(64);
	textFont('Impact');
	text('Loading Simulator', 200, 200);
	textSize(45);
	text('2022', 500, 250);
	//text(color, 450, 250);

	textAlign(CENTER);
	textSize(25);
	text(msgs[msg_index], 450, 550);

	
	
}


async function connectSerial(){
	port = await navigator.serial.requestPort();
	ports = await navigator.serial.getPorts();
	console.log(port);
	await port.open({ baudRate: 115200 });

	//reader = port.readable.getReader()


	const textDecoder = new TextDecoderStream();
	const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
	const reader = textDecoder.readable.getReader();
	//serialConnected = true;

	let currstr = "";

	while (true) {
		const { value, done } = await reader.read();
		if (done) {
		  // Allow the serial port to be closed later.
		  reader.releaseLock();
		  break;
		}
		// value is a Uint8Array.

		//build json string
		if(value.charAt(0) === '{') currstr = value;
		else if(value.includes('}')){
			currstr += value.substring(0, value.indexOf('}')+1);
			//console.log("yay:" + currstr);
			controllerData = JSON.parse(currstr);

			currstr = "";
		}
		else{
			if (currstr.charAt(0) === '{') currstr+=value;
			else currstr = "";
		}
		


		//console.log(value);
	}
}


