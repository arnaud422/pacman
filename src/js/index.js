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

// Wall object
class Wall {
  static width = 40;
  static height = 40;

  constructor({ position }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

//Player obj
class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

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

  //afficher le joueur
  player.draw();

  //gestion des touches

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

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    wallsDraw()
    player.update();
  }
  animate();
})();
