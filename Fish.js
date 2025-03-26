let fish = [];
let stars = [];
let thoughts = [
  "Where's the kelp?",
  "Bubbles!",
  "Shiny!",
  "Is that food?",
  "Just keep swimming...",
  "Hello, world!",
  "*blub*",
  "So many stars!",
  "Feeling peaceful...",
  "Wonder what's up there?"
];
let thoughtFont;

function preload() {
  thoughtFont = loadFont('Helvetica-Bold'); // You might need to replace this with a font file in your sketch folder or a web font
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 20; i++) {
    fish.push(new Fish());
  }
  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }
  textFont(thoughtFont);
  textSize(12);
  textAlign(CENTER, BOTTOM);
}

function draw() {
  background(10, 20, 50); // Deep blue background

  // Draw stars
  fill(255);
  for (let star of stars) {
    star.show();
    star.twinkle();
  }

  // Draw and update fish
  for (let i = fish.length - 1; i >= 0; i--) {
    fish[i].update();
    fish[i].show();
    fish[i].think();
    if (fish[i].isOffScreen()) {
      fish.splice(i, 1);
      fish.push(new Fish()); // Replace with a new fish
    }
  }
}

class Fish {
  constructor() {
    this.x = random(-50, -width);
    this.y = random(height);
    this.speed = random(0.5, 2);
    this.size = random(20, 50);
    this.direction = random([-1, 1]); // -1 for left, 1 for right
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
    this.thoughtBubble = "";
    this.thinkingTimer = 0;
    this.thinkingInterval = random(300, 600); // Think every few frames
  }

  update() {
    this.x += this.speed * this.direction;
    if (random(1) < 0.01) {
      this.y += random(-5, 5); // Slight vertical drift
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    if (this.direction === -1) {
      scale(-1, 1); // Flip fish if moving left
    }
    fill(this.color);
    ellipse(0, 0, this.size, this.size * 0.6); // Body
    triangle(this.size / 2, 0, this.size * 0.8, -this.size * 0.3, this.size * 0.8, this.size * 0.3); // Tail
    pop();
  }

  think() {
    this.thinkingTimer++;
    if (this.thinkingTimer > this.thinkingInterval) {
      this.thoughtBubble = random(thoughts);
      this.thinkingTimer = 0;
      this.thinkingInterval = random(300, 600);
    }
    if (this.thoughtBubble) {
      fill(255);
      noStroke();
      text(this.thoughtBubble, this.x, this.y - this.size * 0.8);
    }
  }

  isOffScreen() {
    if (this.direction === 1 && this.x > width + 50) return true;
    if (this.direction === -1 && this.x < -50) return true;
    return false;
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(2, 5);
    this.brightness = random(100, 255);
    this.twinkleSpeed = random(0.01, 0.05);
    this.twinkleOffset = random(TWO_PI);
  }

  show() {
    fill(255, this.brightness);
    ellipse(this.x, this.y, this.size, this.size);
  }

  twinkle() {
    this.brightness = map(sin(frameCount * this.twinkleSpeed + this.twinkleOffset), -1, 1, 150, 255);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
