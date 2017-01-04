export abstract class Drawable {
  y: number;
  x: number;
  width: number;
  height: number;
  speed: number = 0;
  canvasWidth = 0;
  canvasHeight = 0;
  collidableWith = "";
  isColliding = false;
  type = "";

  constructor(x, y, width, height) {
    // Defualt variables
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  // Define abstract function to be implemented in child objects
  abstract draw();
  abstract move();

  isCollidableWith(object) {
    return (this.collidableWith === object.type);
  }
}
