var planets;
let padding = 0;
const WHITE = 240;

function preload() {
	p_data = loadJSON("planets.json");
}

function setup() {
	padding = windowWidth / 13 - 3;
	createCanvas(windowWidth, 1480);
	background(20);
}

function draw() {
	translate(70, 800);
	noLoop();
	for (let [i, p] of p_data.planets.entries()) {
		p.position = i;
	}
	let planets = p_data.planets;
	planets.sort((a, b) => a.diameter < b.diameter ? 1 : (a. diameter > b.diameter ? -1 : 0));
	textFont("Rajdhani", 12);

	for (p of planets) {
		drawPlanet(p);
		drawLabel(p);
	}
	fill(WHITE);
	textFont("Rajdhani", 36);
	textAlign(CENTER);
	text("The planets & moons\nof the Solar System", windowWidth / 2 - 70, -380);
}

function drawLabel(p) {
	textAlign(CENTER);
	fill(WHITE);
	text(p.name, (p.position) * padding, 40);
}

function drawPlanet(p) {
	let i = p.position;
	fill(100 + 50 * (i % 3));
	noStroke();
	let r = Math.max(Math.round(p.diameter / 12756 * 8), 2);
	ellipse(i * padding, 10 - r / 2, r, r);
	for (let [j, m] of p.moons.entries()) {
		stroke(WHITE);
		if (j % 10 === 0 && j > 0) {
			ellipse(i * padding + 0.5, j * 8 + 65.5, 2, 2);
		} else {
			point(i * padding, j * 8 + 65);
		}
	}
}
