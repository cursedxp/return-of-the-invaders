class InvaderMissiles {
  constructor({ position, speed }) {
    this.position = position;
    this.speed = speed;
    this.width = 3;
    this.height = 6;
  }
  draw() {
    //console.log(this.position);
    context.fillStyle = "yellow";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
