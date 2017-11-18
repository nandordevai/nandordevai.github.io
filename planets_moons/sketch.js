let padding = 0;
const WHITE = 240;

function preload() {
	planets = loadJSON("planets.json");
}

function setup() {
	padding = windowWidth / 13 - 3;
	createCanvas(windowWidth, 1200);
	background(20);
}

function draw() {
	translate(70, 400);
	noLoop();
	for (let [i, p] of planets.planets.entries()) {
		drawPlanet(p, i);
		drawLabel(p, i);
	}
	fill(WHITE);
	textFont("Rajdhani", 36);
	textAlign(CENTER);
	text("The planets & moons of the Solar System", windowWidth / 2 - 70, -280);
}

function drawLabel(p, i) {
	textFont("Rajdhani", 12);
	textAlign(CENTER);
	fill(WHITE);
	text(p.name, i * padding, 40);
}

function drawPlanet(p, i) {
	fill(150 + 40 * (i % 3));
	noStroke();
	let r = Math.max(Math.round(p.diameter / 12742) * 20, 2);
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
