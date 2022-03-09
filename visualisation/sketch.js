var progress;
var ww;
var loading_max_width;

var loading_x;
var loading_y;


function setup() {
	progress = 0.5;
	let wh = windowHeight - 100
	ww = wh
	createCanvas(wh,wh); // make an HTML canvas element width x height pixels

	document.title = "Loading...";

	loading_max_width = ww - 9;
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
	
	
}


