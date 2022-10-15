class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.speed = {
      x: 1,
      y: 0,
    };
    this.invaders = [];

    this.width = 12 * 56;

    //Create column of invaders
    for (let i = 0; i < 12; i++) {
      //Create row
      for (let j = 0; j < 3; j++) {
        this.invaders.push(new Invader({ position: { x: i * 56, y: j * 56 } }));
      }
    }
  }
  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    this.speed.y = 0;

    //Limit the invader tiles moves on canvas x access
    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.speed.x = -this.speed.x;
      //Go down one line if the grid reaches end of the screen
      this.speed.y += 30;
    }
  }
}
