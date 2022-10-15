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
    grid.invaders.forEach((invader, index) => {
      invader.update({ speed: grid.speed });

      //Shoot the invaders
      missiles.forEach((missile, mindex) => {
        // let invaderHeight = invader.position.y + invader.image.height;
        // let missileRightLine = missile.position.x + missile.radius;
        // let missileTopline = missile.position.y - missile.radius;

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

        // if (collision(invader, missile)) {
        //   console.log("Another log");
        // }
      });
    });
  });
}

function collision(invader, missile) {
  //console.log(invader.position.x, missile.position.x);
  // if (
  //   missileTopline <= invaderBottomLine &&
  //   missile.position.y == invader.position.y
  // ) {
  //   console.log("You Shoot the invader");
  // }
  // return (
  //   missile.position.x >= invader.position.x &&
  //   missile.position.x < invader.position.x + invader.image.width
  //   // &&
  //   // missile.position.y >= invader.position.y + 3
  // );
  // if (
  //   // missile.position.y < invader.position.y + invader.height &&
  //   // missile.position.y >= invader.position.y
  //   missile.position.y < invader.position.y + invader.height ||
  //   missile.position.x < invader.position.x + invader.width ||
  //   invader.position.x - invader.width < missile.x
  // ) {
  //   console.log("Hey");
  // }
  // setTimeout(() => {
  //   grid.invaders.splice(index, 1);
  //   missiles.splice(mindex, 1);
  // }, 0);
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
