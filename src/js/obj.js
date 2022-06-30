// Wall object
class Wall {
    static width = 20;
    static height = 20;
  
    constructor({ position }) {
      this.position = position;
      this.width = 20;
      this.height = 20;
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
      this.radius = 9;
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

let KEYS = {
  s:false,
  z:false,
  q:false,
  d:false
}