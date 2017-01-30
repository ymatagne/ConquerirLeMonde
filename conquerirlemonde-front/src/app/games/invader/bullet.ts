import {Drawable} from "./drawable";
import {ImageRepository} from "./imageRepository";

export class Bullet extends Drawable {
  alive = false; // Is true if the bullet is currently in use
  self: any;
  imageRepository: ImageRepository;
  context: any;

  constructor(object, mainContext, imageRepository: ImageRepository) {
    super(0, 0, 0, 0);
    this.self = object;
    this.context = mainContext;
    this.imageRepository = imageRepository;
  }
  /*
   * Sets the bullet values
   */
  spawn(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.alive = true;
  };

  /*
   * Uses a "drity rectangle" to erase the bullet and moves it.
   * Returns true if the bullet moved of the screen, indicating that
   * the bullet is ready to be cleared by the pool, otherwise draws
   * the bullet.
   */
  draw() {
    if (this.self === "bullet") {
      this.context.clearRect(this.x - 1, this.y - 1, this.imageRepository.bullet.width + 2, this.imageRepository.bullet.height + 2);
    }
    else if (this.self === "enemyBullet") {
      this.context.clearRect(this.x - 1, this.y - 1, this.imageRepository.enemyBullet.width + 2, this.imageRepository.enemyBullet.height + 2);
    }

    this.y -= this.speed;

    if (this.isColliding) {
      return true;
    }
    else if (this.self === "bullet" && this.y <= 0 - this.imageRepository.bullet.height) {
      return true;
    }
    else if (this.self === "enemyBullet" && this.y >= this.canvasHeight) {
      return true;
    }
    else {
      if (this.self === "bullet") {
        this.context.drawImage(this.imageRepository.bullet, this.x, this.y);
      }
      else if (this.self === "enemyBullet") {
        this.context.drawImage(this.imageRepository.enemyBullet, this.x, this.y);
      }

      return false;
    }
  };
  move() { }

  /*
   * Resets the bullet values
   */
  clear() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.alive = false;
    this.isColliding = false;
  };
}
