// html variable
const GAME = document.getElementById("game");
let ctx = GAME.getContext("2d");

GAME.width = innerWidth;
GAME.height = innerHeight;

// js variable
const MAP = [
  ["-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", " ", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-"],
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

  //key management
  document.addEventListener("keyup", ({ key }) => {
    console.log(key)
    switch (key) {
      case "z":
        player.velocity.y += -5;
        break;
      case "q":
        player.velocity.x += -5;
        break;
      case "s":
        player.velocity.y += 5;
        break;
      case "d":
        player.velocity.x += 5;
        break;
    }
  });

  //annimation
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    wallsDraw()
    player.update();
  }
  animate();
})();
