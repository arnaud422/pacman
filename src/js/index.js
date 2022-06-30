// html variable
const GAME = document.getElementById("game");
let ctx = GAME.getContext("2d");

GAME.width = innerWidth;
GAME.height = innerHeight;

// js variable
const MAP = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "-"],
  ["-", "•", "-", "-", "-", "-", "•", "•", "•", "-", "-", "-", "•", "•", "•", "•", "-", "-", "-", "•", "•", "•", "-", "-", "-", "-", "•", "-"],
  ["-", "•", "-", "•", "•", "-", "•", "•", "•", "-", "•", "•", "-", "•", "•", "•", "-", "•", "•", "-", "•", "•", "-", "•", "•", "•", "•", "-"],
  ["-", "•", "-", "•", "•", "-", "•", "-", "•", "-", "•", "•", "•", "-", "•", "•", "-", "•", "•", "-", "•", "•", "-", "•", "•", "•", "•", "-"],
  ["-", "•", "-", "-", "-", "-", "•", "-", "•", "-", "•", "•", "•", "-", "•", "•", "-", "-", "-", "•", "•", "•", "-", "-", "-", "-", "•", "-"],
  ["-", "•", "-", "•", "•", "-", "•", "-", "•", "-", "•", "•", "-", "•", "•", "•", "-", "•", "•", "-", "•", "•", "•", "•", "•", "-", "•", "-"],
  ["-", "•", "-", "•", "•", "-", "•", "•", "•", "-", "-", "-", "•", "•", "•", "•", "-", "•", "•", "-", "•", "•", "-", "-", "-", "-", "•", "-"],
  ["-", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "•", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

// function start
(() => {
  const walls = [];

  const player = new Player({
    position: {
      x: Wall.width + Wall.width / 2,
      y: Wall.height + Wall.height / 2,
    },
    velocity: {
      x: 0,
      y: 0,
    },
  });

  //add walls in [walls] for show walls
  MAP.forEach((row, i) => {
    row.forEach((item, j) => {
      switch (item) {
        case "-":
          walls.push(
            new Wall({
              position: {
                x: j * Wall.width,
                y: i * Wall.height,
              },
            })
          );
          break;
      }
    });
  });

  //   Function show walls
  function wallsDraw() {
    walls.forEach((wall) => {
      wall.draw();
    });
  }

  //   show walls
  wallsDraw();

  //show le player
  player.draw();

  let lastKey = null;

  //key management
  document.addEventListener("keydown", ({ key }) => {
    switch (key) {
      case "z":
        KEYS.z = true;
        lastKey = "z";
        break;
      case "q":
        KEYS.q = true;
        lastKey = "q";
        break;
      case "s":
        KEYS.s = true;
        lastKey = "s";
        break;
      case "d":
        KEYS.d = true;
        lastKey = "d";
        break;
    }
  });

  document.addEventListener("keyup", ({ key }) => {
    switch (key) {
      case "z":
        KEYS.z = false;
        break;
      case "q":
        KEYS.q = false;
        break;
      case "s":
        KEYS.s = false;
        break;
      case "d":
        KEYS.d = false;
        break;
    }
  });

  //annimation
  function animate() {
    requestAnimationFrame(animate);
    KEYS = KEYS;
    ctx.clearRect(0, 0, GAME.width, GAME.height);

    //one Mouvement
    if (KEYS.z && lastKey === "z") {
        player.velocity.x = 0;
        player.velocity.y = -3;
      }
      if (KEYS.s && lastKey === "s") {
        player.velocity.x = 0;
        player.velocity.y = 3;
      }
      if (KEYS.q && lastKey === "q") {
        player.velocity.y = 0;
        player.velocity.x = -3;
      }
      if (KEYS.d && lastKey === "d") {
        player.velocity.y = 0;
        player.velocity.x = 3;
      }

    walls.forEach((wall) => {
        wall.draw();
        if(
            player.position.y - player.radius + player.velocity.y < wall.position.y + wall.height &&
            player.position.y + player.radius + player.velocity.y > wall.position.y &&
            player.position.x + player.radius + player.velocity.x > wall.position.x &&
            player.position.x - player.radius + player.velocity.x < wall.position.x + wall.width
        ){
            console.log('coliding');
            player.velocity.x = 0;
            player.velocity.y = 0;
        }
    });

    player.update();
    // player.velocity.x = 0;
    // player.velocity.y = 0;

    
  }

  animate();
})();
