var heading;
var slider;
var button;
var radius;
var r;
var i = 50;
var hit = false;
var flag = false;
var rate = 1;
var count = 200;
var counter = 200;
var energy = 0;
var save;

function setup() {
	createCanvas(800, 600);
	
	heading = createElement('h1', 'Aniruddha Fission Reactor');
	heading.position(150, 0);

	button = createButton('PLAY');
	button.position(70, 30);
	button.mouseClicked(sv);

	// Neutron
	slider = createSlider(0, 100, 31);	// 50
	slider.parent(heading);
	slider.style('margin-left: 20px');

	// Nucleus
	s1 = createSlider(0, 100, 9);		// 50
	s2 = createSlider(0, 100, 100);		// 50
	s3 = createSlider(200, 600, 600);	// 400
	s4 = createSlider(20, 200, 102);	// 100

	collideDebug(true);					// Collision init
}

function draw() {
	background(200);			// light-grey

	radius = slider.value();	// default = 31

	neutron();
	nucleus(i++);

	hit = collideCircleCircle(i, 300, 31, 200, 300, 31);
	if (hit) {
		i = 1000;
		flag = true;
	}

	frameRate(rate);

	if (save > 600) {
		save = energy;
		heat();
	} if (save > 650) {
		heat();
		energy = 0;
	}
}

function neutron() {
	fill('yellow');
	r = map(radius, 0, 100, 0, 30);
	ellipse(i, 300, r, r);
	fill('white');
}

function nucleus() {
    var a = s1.value();         	// Size							// 	9		
    var b = s2.value() / 100000; 	// Growth Rate Parameter		// 	100
    var e = exp(b);         		// Exponential Growth
	var d = s3.value();			 	// Density						// 	600
	var f = s4.value();			 	// Frequency					// 	102
    var wave = PI / 180;    		// Radian -> Degree conversion	// 	0.017453292519943295
	var X, Y;
	
	for (var i = 0; i < d; i += f ) {
		X = a * pow(e, i) * cos(i * wave);
		Y = a * pow(e, i) * sin(i * wave);
		if (flag) {
			fill(randomColor(), randomColor(), randomColor(), 200);
			radius = random(0, 40);
			fissionProduct();
		} else {
			fisR = radius;
		}
		ellipse(X + 180, Y + 300, radius, radius);
	}

	fill('white');
}

function sv() {
	rate = 30;
}

function randomColor() {
	return random(0, 255);
}

var Kr = {
	circleX : 0,
	circleY : 0
}

var Ba = {
	circleX : 0,
	circleY : 0
}

function fissionProduct() {
	Kr.circleY = (1800 - 2 * count) / 5;
	Kr.circleX = count;

	Ba.circleY = (1200 + 2 * count) / 5;
	Ba.circleX = count;

	var n1 = (2600 - counter) / 8;
	var n2 = counter;
	var n3 = (2200 + counter) / 8;
	

	fill('white');
	ellipse(Kr.circleX, Kr.circleY, fisR, fisR);
	ellipse(Ba.circleX, Ba.circleY, fisR, fisR);
	fill('yellow');
	ellipse(counter, n1, r, r);
	ellipse(n2, 300, r, r);
	ellipse(counter, n3, r, r);
	fill(randomColor(), randomColor(), randomColor(), 200);

	if (Kr.circleX <= 400) {
		count++;
	} if (counter <= 600) {
		counter++;
	}

	save = counter;
}

function heat() {
	noFill();
	energy += 10;
	ellipse(180, 300, energy, energy);
}
