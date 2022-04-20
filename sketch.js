function setup() {
  frameCount = 0;
  let canvas=createCanvas(420, 700);
  canvas.parent("canvasContainer")
  bg = color(random(225, 255), random(225, 255), random(225, 255));
  rs = [];
  ps = [];
  rc = 0;
  pc = 0;
  pp = -1;
  cs = [];
  cc = 0;
  cd = 0;
  for (x = 0; x < 7; x++) {
    rs[x] = new Radial(random(0, 600), random(0, 600), random(400));
    ps[x] = new Point(random(width), random(height), random(10, 70));
    ps[x].display();
    rc += 1;
    pc += 1;
  }
}

class Point {
  constructor(x, y, s) {
    this.still = 0;
    this.cx = x;
    this.cy = y;
    this.rad = random(6.28);
    this.size = s;
    this.sizeg = 1;
    this.x = this.cx;
    this.y = this.cy + this.size;
    this.speedX = random(1, 2);
    this.speedY = random(1, 2);
    this.direction = random(1);
  }

  update() {
    push();
    constrain(this.speedX, 0, 3);
    constrain(this.speedY, 0, 3);
    if (this.still == 0) {
      if (this.direction > 0.5) {
        this.rad += 1;
      } else {
        this.rad -= 1;
      }

      this.x = this.cx + this.size * sin(radians(this.rad));
      this.y = this.cy + this.size * cos(radians(this.rad));
      pop();
    }
  }

  display() {
    push();
    noFill();
    strokeWeight(1);
    for (let i = 0; i < this.size; i += 1) {
      stroke(0, 0, 0, (i * (45 + this.size * 3)) / this.size);
      circle(this.x, this.y, i);
    }
    pop();
  }

  connect(point2) {
    push();
    let n = 0;
    strokeWeight(1);
    noFill();
    if (abs(this.x - point2.x) > abs(this.y - point2.y)) {
      for (let i = 0; i < abs(point2.x - this.x); i++) {
        n = (abs(point2.x - this.x) / (point2.x - this.x)) * i;
        stroke(
          0,
          0,
          0,
          45 +
            this.size * 3 -
            ((45 + this.size * 3) / abs(point2.x - this.x)) * i
        );
        circle(
          this.x + n,
          ((this.x + n) * (point2.y - this.y)) / (point2.x - this.x) +
            this.y -
            (this.x * (point2.y - this.y)) / (point2.x - this.x),
          this.size - (this.size * i) / abs(point2.x - this.x)
        );
      }
      for (let i = 0; i < abs(point2.x - this.x); i++) {
        n = (abs(point2.x - this.x) / (this.x - point2.x)) * i;
        stroke(
          0,
          0,
          0,
          45 +
            point2.size * 3 -
            ((45 + point2.size * 3) / abs(this.x - point2.x)) * i
        );
        circle(
          point2.x + n,
          ((point2.x + n) * (point2.y - this.y)) / (point2.x - this.x) +
            this.y -
            (this.x * (point2.y - this.y)) / (point2.x - this.x),
          point2.size - (point2.size * i) / abs(point2.x - this.x)
        );
      }
    } else {
      for (let i = 0; i < abs(point2.y - this.y); i++) {
        n = (abs(point2.y - this.y) / (point2.y - this.y)) * i;
        stroke(
          0,
          0,
          0,
          45 +
            this.size * 3 -
            ((45 + this.size * 3) / abs(point2.y - this.y)) * i
        );
        circle(
          ((this.y +
            n -
            this.y +
            (this.x * (point2.y - this.y)) / (point2.x - this.x)) /
            (point2.y - this.y)) *
            (point2.x - this.x),
          this.y + n,
          this.size - (this.size * i) / abs(point2.y - this.y)
        );
      }
      for (let i = 0; i < abs(point2.y - this.y); i++) {
        n = (abs(point2.y - this.y) / (this.y - point2.y)) * i;
        stroke(
          0,
          0,
          0,
          45 +
            point2.size * 3 -
            ((45 + point2.size * 3) / abs(this.y - point2.y)) * i
        );
        circle(
          ((point2.y +
            n -
            this.y +
            (this.x * (point2.y - this.y)) / (point2.x - this.x)) /
            (point2.y - this.y)) *
            (point2.x - this.x),
          point2.y + n,
          point2.size - (point2.size * i) / abs(point2.y - this.y)
        );
      }
    }
    pop();
  }
}

class Radial {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.speedX = 0;
    this.speedY = 0;
  }

  update() {
    push();
    if (mouseIsPressed && 0<=mouseX<=width && 0<=mouseY<=height) {
      this.speedX += (mouseX - this.x) / 1000;
      this.speedY += (mouseY - this.y) / 1000;
      this.x += this.speedX;
      this.y += this.speedY;
    }
    else{
      this.speedX = 0;
      this.speedY = 0;
    }
    pop();
  }

  radiate(point2) {
    push();
    strokeWeight(1);
    for (let i = 0; i < this.size / 2; i++) {
      if (frameCount <= 17) {
        stroke(0, 0, 0, frameCount * 15 - (2 * i * 255) / this.size);
      } else {
        stroke(0, 0, 0, 225 - (2 * i * 225) / this.size);
      }
      line(
        point2.x,
        point2.y,
        this.x + i,
        (-(this.x + i) / (point2.y - this.y)) * (point2.x - this.x) +
          this.y +
          (this.x / (point2.y - this.y)) * (point2.x - this.x)
      );
      line(
        point2.x,
        point2.y,
        this.x - i,
        (-(this.x - i) / (point2.y - this.y)) * (point2.x - this.x) +
          this.y +
          (this.x / (point2.y - this.y)) * (point2.x - this.x)
      );
    }
    for (let i = 0; i < point2.size / 2; i++) {
      if (frameCount <= 17) {
        stroke(255, 255, 255, frameCount * 15 - (2 * i * 255) / this.size);
      } else {
        stroke(255, 255, 255, 225 - (2 * i * 225) / point2.size);
      }
      line(
        this.x,
        this.y,
        point2.x + i,
        (-(point2.x + i) / (point2.y - this.y)) * (point2.x - this.x) +
          point2.y +
          (point2.x / (point2.y - this.y)) * (point2.x - this.x)
      );
      line(
        this.x,
        this.y,
        point2.x - i,
        (-(point2.x - i) / (point2.y - this.y)) * (point2.x - this.x) +
          point2.y +
          (point2.x / (point2.y - this.y)) * (point2.x - this.x)
      );
    }
    pop();
  }
}

function draw() {
  background(bg);
  for (i = 0; i < rc; i++) {
    rs[i].update();
    if (i > 0) {
      rs[i].radiate(rs[i - 1]);
    }
  }
  for (i = 0; i < pc; i++) {
    if (dist(mouseX, mouseY, ps[i].x, ps[i].y) < ps[i].size / 2) {
      if (pp == -1) {
        pp = i;
        ps[i].still = 1;
      } else if (i != pp) {
        cs[cc] = [pp, i];
        pp = i;
        ps[i].still = 1;
        cc += 1;
      }
    }
    ps[i].display();
    ps[i].update();
  }
  for (i = 0; i < cc; i++) {
    ps[cs[i][0]].connect(ps[cs[i][1]]);
  }
  if (cc > 6) {
    cd += 1;
    background(0, 0, 0, cd * 15);
  }
  if (cd == 17) {
    setup();
  }
  if (frameCount <= 17) {
    background(0, 0, 0, 255 - frameCount * 16);
  }
}
