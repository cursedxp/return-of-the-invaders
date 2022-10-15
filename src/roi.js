//Select Canvas

const canvas = document.getElementById("gameBoard");

//Generate canvas context
let context = canvas.getContext("2d");

//FullScreen Canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Player class
//Invader Class
//Misiles calss
//Grid Class

const player = new Player();
const missiles = [];
const grids = [new Grid()];

//Animations
function runAllAnimations() {
  requestAnimationFrame(runAllAnimations);
  //Draw Space
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  //Create Player and update it
  player.update();
  //Add missiles to canvas and update postions
  missiles.forEach((missile, index) => {
    //Cean up the missiles to increase performance
    if (missile.position.y + missile.radius <= 0) {
      missiles.splice(index, 1);
    } else {
      missile.update();
    }
  });

  //place the grid of invaders
  grids.forEach((grid) => {
    grid.update();
    grid.invaders.forEach((invader) => {
      invader.update({ speed: grid.speed });
    });
  });
}

runAllAnimations();

//Move the ship when the key pressed
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      player.speed.x -= 10;
      break;
    case "ArrowRight":
      player.speed.x += 10;
      break;
    case " ":
      missiles.push(
        new Missiles({
          position: {
            x: player.position.x + player.image.width / 2,
            y: player.position.y,
          },
          speed: { x: 0, y: -10 },
        })
      );

      break;
  }
});
window.addEventListener("keyup", (e) => {
  player.speed.x = 0;
});
