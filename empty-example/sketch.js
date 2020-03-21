let scaleFactor;

const pacing = 2.5;
const size = 20.5;
const marginTop = 1
const marginLeft = 1
const street = 37.5;

class Building {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Home1 extends Building {
  constructor(x, y) {
    super(x, y, size, size, "rgba(0, 204, 0, 0.25)");
  }
}

class Home2H extends Building {
  constructor(x, y) {
    super(x, y, 2*size, size, "rgba(0, 204, 0, 0.25)");
  }
}

class Home2V extends Building {
  constructor(x, y) {
    super(x, y, size, 2*size, "rgba(0, 204, 0, 0.25)");
  }
}

class Home4 extends Building {
  constructor(x, y) {
    super(x, y, 2*size, 2*size, "rgba(0, 204, 0, 0.25)");
  }
}


class Home5 extends Building {
  constructor(x, y) {
    super(x, y, 3*size, 2*size, "rgba(0, 204, 0, 0.25)");
  }
}

class Work extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height, "rgba(255, 255, 0, 0.25)");
  }
}

const houses = [
  new Home2H(marginLeft, marginTop),
  new Home4(marginLeft, marginTop + pacing + size),
  new Home2H(marginLeft, marginTop + pacing*2 + size*3),
  new Home4(marginLeft, marginTop + pacing*3 + size*4),
  new Home2H(marginLeft, marginTop + pacing*4 + size*6),
  new Home2H(marginLeft, marginTop + pacing*5 + size*7),
  new Home4(marginLeft, marginTop + pacing*6 + size*8),
  new Home1(marginLeft, marginTop + pacing*7 + size*10),
  new Home2V(marginLeft, marginTop + pacing*8 + size*11),
  new Home1(marginLeft, marginTop + pacing*9 + size*13),
  new Home1(marginLeft, marginTop + pacing*10 + size*14),
  new Home2V(marginLeft, marginTop + pacing*11 + size*15),
  new Work(marginLeft, marginTop + pacing*11 + size*14 + street*2, size*5.5, size*4),
  new Home4(marginLeft, marginTop + pacing*12 + size*18 + street*2)
]

houses.push(...[
  new Home1(marginLeft + pacing*2 + +size*2 + street*1, marginTop + pacing*2 + size*3),
  new Home1(marginLeft + pacing*3 + +size*3 + street*1, marginTop + pacing*2 + size*3),
  new Home2H(marginLeft + pacing*2 + +size*2 + street*1, marginTop + pacing*3 + size*4),
  new Home4(marginLeft + pacing*2 + +size*2 + street*1, marginTop + pacing*4 + size*5),
  new Home2H(marginLeft + pacing*2 + +size*2 + street*1, marginTop + pacing*5 + size*7),
  new Home4(marginLeft + pacing*2 + +size*2 + street*1, marginTop + pacing*6 + size*8),
  new Home4(marginLeft + pacing*2 + +size*1 + street*1, marginTop + pacing*8 + size*10 + street*1),
  new Home4(marginLeft + pacing*2 + +size*1 + street*1, marginTop + pacing*9 + size*12 + street*1),

  new Home4(marginLeft + pacing*1 + size*2, marginTop + pacing*13 + size*18 + street*3),
]);


function setup() {
  // 1000 x 562.5
  createCanvas(windowWidth, windowHeight);

  scaleFactor = min(windowWidth / 1000,  windowHeight / 562.5);
}

function draw() {
  background(255);  

  scale(scaleFactor);

  for(const house of houses) {
    house.draw();
  }
}

// 33,86 x 19,05 
// Person = Radius 9
// Einzelwohnug = 21x21
// Doppelwohung = 21x42 bzw. 42x21
// Dreier und viererwohung = 42x42
// Fünferwohung = 63x42
// Pacing = 4
// Straßenbreite = 37.5
// 


// 1,2 x 0,71



[
  ["two", marginLeft, marginTop]
  ["four", marginLeft + size + pacing, marginTop]
]