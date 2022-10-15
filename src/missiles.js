class Missiles {
  constructor({ position, speed }) {
    this.position = position;
    this.speed = speed;
    this.radius = 3;
  }
  draw() {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "Red";
    context.fill();
    context.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
