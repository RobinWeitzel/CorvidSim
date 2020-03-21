
const pacing = 2.5;
const size = 22.5;

const houses = [];

let start = undefined;
let end = undefined;
let type = "home";

class Building {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    stroke(255);
    fill(255);
    rect(this.x, this.y, this.width, this.height);
    stroke(0);
    fill(this.color);
    rect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);
  }

  checkCollision() {
    if(this.x > mouseX/scaleFactor || this.y > mouseY/scaleFactor || this.x + this.width < mouseX/scaleFactor || this.y + this.height < mouseY/scaleFactor) {
      return false;
    }

    return true;
  }

  toString() {
    return `{"name": "${this.constructor.name}", "x": ${this.x}, "y": ${this.y}, "width": ${this.width}, "height": ${this.height}}`;
  }

  static fromString(string) {
    const obj = JSON.parse(string);

    if(obj.name === "Home1") {
      return new Home1(obj.x, obj.y);
    }
    
    if(obj.name === "Home2H") {
      return new Home2H(obj.x, obj.y);
    }
    
    if(obj.name === "Home2V") {
      return new Home2V(obj.x, obj.y);
    }
    
    if(obj.name === "Home4") {
      return new Home4(obj.x, obj.y);
    }

    if(obj.name === "Home5") {
      return new Home5(obj.x, obj.y);
    }

    if(obj.name === "BusinessNE") {
      return new BusinessNE(obj.x, obj.y, obj.width, obj.height);
    }
    
    if(obj.name === "BusinessE") {
      return new BusinessE(obj.x, obj.y, obj.width, obj.height);
    }

    if(obj.name === "Work") {
      return new Work(obj.x, obj.y, obj.width, obj.height);
    }

    if(obj.name === "School") {
      return new School(obj.x, obj.y, obj.width, obj.height);
    }

    if(obj.name === "Hospital") {
      return new Hospital(obj.x, obj.y, obj.width, obj.height);
    }

    if(obj.name === "Freetime") {
      return new Freetime(obj.x, obj.y, obj.width, obj.height);
    }

    if(obj.name === "Street") {
      return new Street(obj.x, obj.y, obj.width, obj.height);
    }
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

class BusinessNE extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height, "rgba(0, 102, 255, 0.25)");
  }
}

class BusinessE extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height, "rgba(0, 0, 204, 0.25)");
  }
}

class Work extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height, "rgba(255, 255, 0, 0.25)");
  }
}

class School extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height, "rgba(153, 102, 51, 0.25)");
  }
}

class Hospital extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height, "rgba(255, 255, 255, 1)");
  }
}

class Freetime extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height, "rgba(255, 0, 255, 0.25)");
  }
}

class Street extends Building {
  constructor(x, y, width, height) {
    super(x, y, width, height, "rgba(127, 127, 127, 0.25)");
  }

  draw() {
    noStroke();
    fill(255);
    rect(this.x, this.y, this.width, this.height);
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}

function setup() {
  // 1000 x 562.5
  createCanvas(windowWidth, windowHeight);

  scaleFactor = min(windowWidth / 1000,  windowHeight / 562.5);

  let housesRaw = localStorage.getItem("houses");

  if(housesRaw) {
    housesRaw = JSON.parse(housesRaw);

    for(const hr of housesRaw) {
      houses.push(Building.fromString(hr));
    }
  }
}

function draw() {
  background(255);  

  scale(scaleFactor);

  stroke(0);

  // Vertical
  for(let i = 0; i*size <= 1000; i++) {
    line(i*size, 0, i*size, 562.5);
  }

  // Horizontal
  for(let i = 0; i*size <= 562.5; i++) {
    line(0, i*size, 1000, i*size);
  }

  if(start && end) {
    for(let i = min(start[0], end[0]); i <= max(start[0], end[0]); i++) {
      for(let j = min(start[1], end[1]); j <= max(start[1], end[1]); j++) {
        switch(type) {
          case "home": fill("rgba(0, 204, 0, 0.25)"); break;
          case "non-essential": fill("rgba(0, 102, 255, 0.25)"); break;
          case "essential": fill("rgba(0, 0, 204, 0.25)"); break;
          case "work": fill("rgba(255, 255, 0, 0.25)"); break;
          case "school": fill("rgba(153, 102, 51, 0.25)"); break;
          case "hospital": fill("rgba(255, 0, 0, 0.25)"); break;
          case "freetime": fill("rgba(255, 0, 255, 0.25)"); break;
          case "street": fill("rgba(127, 127, 127, 0.25)"); break;
        }

        rect(i*size, j*size, size, size);
      }
    }
  }

  for(const house of houses) {
    house.draw();
  }
}

function mousePressed(e) {
  if (mouseButton === LEFT) {
    start = [floor(mouseX / scaleFactor / size), floor(mouseY / scaleFactor / size)];
    end = [floor(mouseX / scaleFactor / size), floor(mouseY / scaleFactor / size)];
  } else if(mouseButton === RIGHT) {
    for(let i = 0; i < houses.length; i++) {
      if(houses[i].checkCollision()) {
        houses.splice(i, 1);
        localStorage.setItem("houses", JSON.stringify(houses.map(h => h.toString())));
        break;
      }
    }
  }
}

function mouseDragged() {
    end = [floor(mouseX / scaleFactor / size), floor(mouseY / scaleFactor / size)];
}

function mouseReleased() {
  if(start && end) {
      const width = max(start[0], end[0]) - min(start[0], end[0]) + 1;
      const height = max(start[1], end[1]) - min(start[1], end[1]) + 1;

      if(type === "home") {
        if(width === 1 && height === 1) {
          houses.push(new Home1(min(start[0], end[0]) * size, min(start[1], end[1]) * size));
        }

        if(width === 2 && height === 1) {
          houses.push(new Home2H(min(start[0], end[0]) * size, min(start[1], end[1]) * size));
        }

        if(width === 1 && height === 2) {
          houses.push(new Home2V(min(start[0], end[0]) * size, min(start[1], end[1]) * size));
        }

        if(width === 2 && height === 2) {
          houses.push(new Home4(min(start[0], end[0]) * size, min(start[1], end[1]) * size));
        }

        if(width === 3 && height === 2) {
          houses.push(new Home5(min(start[0], end[0]) * size, min(start[1], end[1]) * size));
        }
      }

      if(type === "non-essential") {
        houses.push(new BusinessNE(min(start[0], end[0]) * size, min(start[1], end[1]) * size, width * size, height * size));
      }

      if(type === "essential") {
        houses.push(new BusinessE(min(start[0], end[0]) * size, min(start[1], end[1]) * size, width * size, height * size));
      }

      if(type === "work") {
        houses.push(new Work(min(start[0], end[0]) * size, min(start[1], end[1]) * size, width * size, height * size));
      }

      if(type === "school") {
        houses.push(new School(min(start[0], end[0]) * size, min(start[1], end[1]) * size, width * size, height * size));
      }

      if(type === "freetime") {
        houses.push(new Freetime(min(start[0], end[0]) * size, min(start[1], end[1]) * size, width * size, height * size));
      }

      if(type === "hospital") {
        houses.push(new Hospital(min(start[0], end[0]) * size, min(start[1], end[1]) * size, width * size, height * size));
      }

      if(type === "street") {
        houses.push(new Street(min(start[0], end[0]) * size, min(start[1], end[1]) * size, width * size, height * size));
      }

      start = undefined;
      end = undefined;

      localStorage.setItem("houses", JSON.stringify(houses.map(h => h.toString())));
    }
}

function keyTyped() {
  if(key === '1') {
    type = "home";
  }

  if(key === '2') {
    type = "non-essential";
  }

  if(key === '3') {
    type = "essential";
  }

  if(key === '4') {
    type = "work";
  }

  if(key === '5') {
    type = "school";
  }

  if(key === '6') {
    type = "freetime";
  }

  if(key === '7') {
    type = "hospital";
  }

  if(key === '8') {
    type = "street";
  }
}

document.addEventListener('contextmenu', event => event.preventDefault());


