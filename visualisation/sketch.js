var progress;
var ww;
var loading_max_width;

var loading_x;
var loading_y;

var serialConnected = false;
var port;
var ports;
//var reader;

var controllerData = {};

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

	button = createButton('click me');
	button.position(0, 0);
	button.mousePressed(connectSerial);
	
}

function draw() {
	background(255);
	fill(0);

	//draw loading bar
	rect(0 , 300, ww, 200);
	fill(255);
	rect(3 , 303, ww-6, 194);
	fill(0);
	rect(6 , 306, (ww-12)*progress, 188);
	

	fill(0);
	textSize(64);
	textFont('Impact');
	text('Loading Simulator', 100, 200);
	textSize(45);
	text('2022', 450, 250);

	text(JSON.stringify(controllerData), 250, 250);

	
	
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
			console.log("yay:" + currstr);
			controllerData = JSON.parse(currstr);

			currstr = "";
		}
		else{
			if (currstr.charAt(0) === '{') currstr+=value;
			else currstr = "";
		}
		


		console.log(value);
	}
}


