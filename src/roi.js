//Select Canvas
const currentScore = document.querySelector("#gameScore");
const canvas = document.getElementById("gameBoard");

const startScreen = document.querySelector(".home");
const startButton = document.querySelector("#start");

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
const explosionParticles = [];
let game = {
  over: false,
  active: true,
};

let frames = 0;
let score = 0;

for (let i = 0; i < 100; i++) {
  explosionParticles.push(
    new Particle({
      position: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      },
      speed: {
        // substracted 0.5 to chose direction
        x: 0,
        y: 0.5,
      },
      radius: Math.random() * 2,
      color: "white",
    })
  );
}

function createExplosions({ gameElement, color, fades }) {
  for (let i = 0; i < 15; i++) {
    explosionParticles.push(
      new Particle({
        position: {
          x: gameElement.position.x + gameElement.image.width / 2,
          y: gameElement.position.y + gameElement.image.height / 2,
        },
        speed: {
          // substracted 0.5 to chose direction
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        radius: Math.random() * 2,
        color: color || "yellow",
        fades,
      })
    );
  }
}

//Animations
function runAllAnimations() {
  if (!game.active) return;
  requestAnimationFrame(runAllAnimations);
  //Draw Space
  context.fillStyle = "rgba(41,15,53,255)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  //Create Player and update it
  player.update();

  explosionParticles.forEach((particle, index) => {
    if (particle.position.y - particle.radius >= canvas.height) {
      particle.position.x = Math.random() * canvas.width;
      particle.position.y = -particle.radius;
    }

    //Changes opacity of particles
    if (particle.opacity <= 0) {
      setTimeout(() => {
        explosionParticles.splice(index, 1);
      }, 0);
    } else {
      particle.update();
    }
  });
  //add invader misiles
  invaderMissiles.forEach((invaderMissile, index) => {
    //Remove missile from the missiles array if it goes out of the screen
    if (invaderMissile.position.y + invaderMissile.height >= canvas.height) {
      setTimeout(() => {
        invaderMissiles.splice(index, 1);
      }, 0);
    } else {
      invaderMissile.update();
    }

    if (
      invaderMissile.position.y + invaderMissile.height >= player.position.y &&
      invaderMissile.position.x + invaderMissile.width >= player.position.x &&
      invaderMissile.position.x <= player.position.x + player.image.width
    ) {
      setTimeout(() => {
        invaderMissiles.splice(index, 1);
        player.opacity = 0;
        game.over = true;
      }, 0);

      //stop the game
      setTimeout(() => {
        game.active = false;
      }, 2000);

      createExplosions({
        gameElement: player,
        color: "white",
        fades: true,
      });
    }
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
              score += 100;
              currentScore.innerHTML = score;
              createExplosions({
                gameElement: invader,
                fades: true,
              });

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

//Move the ship when the key pressed
window.addEventListener("keydown", (e) => {
  if (game.over) return;

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

startButton.addEventListener("click", (e) => {
  e.preventDefault();
  const currentPlayerName = document.querySelector("#currentPlayerName");
  const playerName = document.querySelector("#playerName").value;
  console.log(currentPlayerName);
  if (playerName) {
    currentPlayerName.textContent = playerName;
  } else {
    currentPlayerName.textContent = "Guest";
  }

  console.log("Heloo");
  startScreen.classList.add("hide");
  runAllAnimations();
});
