class Player {
  constructor() {
    //Player image
    const image = new Image();
    image.src = "img/red_01.png";

    //When the image load set listed properties below to the class
    image.onload = () => {
      this.image = image;
      this.image.width = 48;
      this.image.height = 48;
      this.position = {
        //Default postion of the ship on canvas
        x: canvas.width / 2 - this.image.width / 2,
        y: canvas.height - this.image.height - 80,
      };
    };
    //Default position of the player
    //Speed of the sapceship
    this.speed = {
      x: 0,
      y: 0,
    };
  }

  //Draw player on canvas
  draw() {
    if (this.image) {
      context.drawImage(this.image, this.position.x, this.position.y);
    }
  }

  update() {
    if (this.image) {
      this.draw();
      this.position.x += this.speed.x;
    }
  }
}
