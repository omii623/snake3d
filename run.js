let egyseg = 50;
let s;
var w_eat = {
  x: 0,
  y: 0,
  z: 0,
  need: true
};
let point = 0;
let up_down = true;
let left_right = false;
let tomb = [];
var loadPoint = {
  x: [],
  y: [],
  z: []
}
let gameOver = false;
let myFont;

function setup() {
  createCanvas(1000, 1000, WEBGL);
  smooth();

  s = new Snake();

  //noStroke();
  stroke(125, 50, 100);
  //ellipseMode(CORNER);
}

function updateCanvasStyle() {
    const canvas = document.getElementById('defaultCanvas0');
    if (!canvas) return;
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.95;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
}

function waitForCanvas() {
    const canvas = document.getElementById('defaultCanvas0');
    if (canvas) {
        updateCanvasStyle();
        window.addEventListener('resize', updateCanvasStyle);
    } else {
        requestAnimationFrame(waitForCanvas);
    }
}

window.addEventListener('load', waitForCanvas);

function draw() {
  background(10, 10, 10);
  push();
  //rotateY(HALF_PI/2);
  fill('#ED225D');
  //textFont(myFont);
  //textSize(36);
  //text('Point: ' +  point, -50, -440);
  pop();
  push();
  line(-275, -275, 275, -275, -275, -275);
  line(-275, -275, 275, -275, 275, 275);
  line(-275, 275, 275, -275, 275, -275);
  line(-275, -275, -275, -275, 275, -275);
  //////
  line(275, -275, -275, 275, 275, -275);
  line(275, 275, 275, 275, 275, -275);
  line(275, -275, 275, 275, -275, -275);
  line(275, -275, 275, 275, 275, 275);
  /////
  line(275, -275, -275, -275, -275, -275);
  line(-275, 275, -275, 275, 275, -275);
  line(-275, -275, 275, 275, -275, 275);
  line(-275, 275, 275, 275, 275, 275);
  pop();
  frameRate(3);
  //tomb.push(new SnakeLoad);
  if (!gameOver) {
    s.update();
    s.eat();
  }

  s.push2();
  s.show();

  for (let i = 0; i != tomb.length; i++) {
    tomb[i].show(loadPoint.x[i], loadPoint.y[i], loadPoint.z[i]);
  }

}

function preload() {
  myFont = loadFont('Addons/AvenirNextLTPro-Demi.otf');
}

let key_up = false;
let key_down = false;
let key_left = false;
let key_right = false;
let key_83 = false;
let key_87 = false;

function keyPressed() {
  if (keyCode == UP_ARROW && !gameOver) {
    s.Speed(0, -1, 0);
  } else if (keyCode == DOWN_ARROW && !gameOver) {
    s.Speed(0, 1, 0);
  } else if (keyCode == LEFT_ARROW && !gameOver) {
    s.Speed(-1, 0, 0);
  } else if (keyCode == RIGHT_ARROW && !gameOver) {
    s.Speed(1, 0, 0);
  } else if (keyCode == 87 && !gameOver) {
    s.Speed(0, 0, -1);
  } else if (keyCode == 83 && !gameOver) {
    s.Speed(0, 0, 1);
  }
}

function Snake() {
  this.x = -250;
  this.y = -250;
  this.z = -250;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.zSpeed = 1;

  this.show = function show() {
    //fill(55,230,0);
    //ellipse(this.x,this.y,egyseg,egyseg);
    push();
    fill(55, 230, 0);
    translate(this.x, this.y, this.z);
    box(egyseg, egyseg, egyseg);
    pop();
  }

  this.update = function update() {
    this.x = (this.x + this.xSpeed * egyseg); if (this.x < -250) { this.x = 250; } if (this.x > 250) { this.x = -250; }
    this.y = (this.y + this.ySpeed * egyseg); if (this.y < -250) { this.y = 250; } if (this.y > 250) { this.y = -250; }
    this.z = (this.z + this.zSpeed * egyseg); if (this.z < -250) { this.z = 250; } if (this.z > 250) { this.z = -250; }
    //print(this.x + " " + this.y + " " + this.z);

    if (this.x == w_eat.x && this.y == w_eat.y && this.z == w_eat.z) {
      w_eat.need = true;
      print("+1pont"); point++;
      tomb.push(new SnakeLoad);
    }

    for (let i = 1; i < tomb.length; i++) {
      if (this.x == loadPoint.x[i] && this.y == loadPoint.y[i] && this.z == loadPoint.z[i]) {
        gameOver = true;
      }
    }

    push();//hatso
    fill(255, 230, 255);
    translate(this.x, this.y, -275);
    box(egyseg, egyseg, 1);
    pop();

    push();//felso
    fill(255, 230, 255);
    translate(this.x, -275, this.z);
    box(egyseg, 1, egyseg);
    pop();

    push();//also
    fill(255, 230, 255);
    translate(this.x, 275, this.z);
    box(egyseg, 1, egyseg);
    pop();

    push();//jobb
    fill(255, 230, 255);
    translate(275, this.y, this.z);
    box(1, egyseg, egyseg);
    pop();

    push();//bal
    fill(255, 230, 255);
    translate(-275, this.y, this.z);
    box(1, egyseg, egyseg);
    pop();

  }

  this.push2 = function push2() {
    loadPoint.x.unshift(this.x);
    loadPoint.y.unshift(this.y);
    loadPoint.z.unshift(this.z);
  }


  this.Speed = function Speed(a, b, c) {
    this.xSpeed = a;
    this.ySpeed = b;
    this.zSpeed = c;
  }

  this.eat = function eat() {
    if (w_eat.need) {
      let r1 = random(-300, 300); let r2 = random(-300, 300); let r3 = random(-300, 300);
      w_eat.x = r1 - (r1 % egyseg);
      w_eat.y = r2 - (r2 % egyseg);
      w_eat.z = r3 - (r3 % egyseg);
    }
    w_eat.need = false;
    //fill(100,0,0);
    //ellipse(w_eat.x,w_eat.y,egyseg,egyseg);

    push();
    fill(150, 0, 0);
    translate(w_eat.x, w_eat.y, w_eat.z);
    box(egyseg, egyseg, egyseg);
    pop();
    ////////////////////
    push();//hatso
    fill(100, 20, 0);
    translate(w_eat.x, w_eat.y, -275);
    box(egyseg, egyseg, 1);
    pop();

    push();//felso
    fill(100, 20, 0);
    translate(w_eat.x, -275, w_eat.z);
    box(egyseg, 1, egyseg);
    pop();

    push();//also
    fill(100, 20, 0);
    translate(w_eat.x, 275, w_eat.z);
    box(egyseg, 1, egyseg);
    pop();

    push();//jobb
    fill(100, 20, 0);
    translate(275, w_eat.y, w_eat.z);
    box(1, egyseg, egyseg);
    pop();

    push();//bal
    fill(100, 20, 0);
    translate(-275, w_eat.y, w_eat.z);
    box(1, egyseg, egyseg);
    pop();

  }
}

function SnakeLoad() {
  this.show = function show(xL, yL, zL) {
    push();
    fill(55, 230, 250);
    translate(this.x, this.y, this.z);
    box(egyseg - 3, egyseg - 3, egyseg - 3);
    pop();
    this.x = xL;
    this.y = yL;
    this.z = zL;
  }
}
