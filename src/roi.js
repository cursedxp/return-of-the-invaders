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
const invaderMissiles = [];

let frames = 0;

//Animations
function runAllAnimations() {
  requestAnimationFrame(runAllAnimations);
  //Draw Space
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  //Create Player and update it
  player.update();

  //add invader misiles
  invaderMissiles.forEach((invaderMissile) => {
    invaderMissile.update();
  });

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
    //console.log(grid.invaders[0]);
    //fire misiles
    if (frames % 100 === 0 && grid.invaders.length > 0) {
      //console.log("hey");
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
        invaderMissiles
      );
    }

    grid.invaders.forEach((invader, index) => {
      //console.log(invader.position.x);
      invader.update({ speed: grid.speed });
      //Shoot the invaders
      //I need to make some adjustments
      missiles.forEach((missile, mindex) => {
        if (
          missile.position.y - missile.radius <=
            invader.position.y + invader.image.height &&
          missile.position.x + missile.radius >= invader.position.x &&
          missile.position.x - missile.radius <= invader.position.x &&
          missile.position.y + missile.radius >= invader.position.y
        ) {
          setTimeout(() => {
            const invaderFind = grid.invaders.find((invader2) => {
              return invader2 === invader;
            });
            if (invaderFind) {
              grid.invaders.splice(index, 1);
              missiles.splice(mindex, 1);
            }
          }, 0);
        }
      });
    });
  });

  frames++;
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
          speed: { x: 0, y: -20 },
        })
      );

      break;
  }
});
window.addEventListener("keyup", (e) => {
  player.speed.x = 0;
});
