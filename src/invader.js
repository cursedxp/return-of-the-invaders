class Invader {
  constructor({ position }) {
    //Invader image
    const image = new Image();
    image.src = "img/purple_03.png";

    //When the image load set listed properties below to the class
    image.onload = () => {
      this.image = image;
      this.image.width = 48;
      this.image.height = 48;
      //Default postion of the invader on canvas
      this.position = {
        x: position.x,
        y: position.y,
      };
    };

    //Speed of the invader
    this.speed = {
      x: 0,
      y: 0,
    };
  }

  draw() {
    if (this.image) {
      context.drawImage(this.image, this.position.x, this.position.y);
    }
  }

  update({ speed }) {
    if (this.image) {
      this.draw();
      this.position.x += speed.x;
      this.position.y += speed.y;
    }
  }
}
