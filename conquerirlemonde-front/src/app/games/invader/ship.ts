import {Pool} from "./pool";
import {Drawable} from "./drawable";
import {ImageRepository} from "./imageRepository";
import {GamesComponent} from "../games.component";
/**
 * Create the Ship object that the player controls. The ship is
 * drawn on the "ship" canvas and uses dirty rectangles to move
 * around the screen.
 */
export class Ship extends Drawable {
  speed = 3;
  bulletPool;
  fireRate = 15;
  counter = 0;
  imageRepository: ImageRepository;
  alive = true;
  shipContext;
  mainContext;
  game: GamesComponent;

  constructor(x, y, width, height, imageRepository: ImageRepository, shipContext, shipCanvas, mainContext, game : GamesComponent) {
    super(x, y, width, height);
    this.imageRepository = imageRepository;
    this.collidableWith = "enemyBullet";
    this.type = "ship";
    this.isColliding = false;
    this.shipContext = shipContext;
    this.canvasWidth = shipCanvas.width;
    this.canvasHeight = shipCanvas.height;
    this.mainContext = mainContext;

    this.bulletPool = new Pool(30, imageRepository, mainContext);
    this.bulletPool.init("bullet", undefined);
    this.game = game;
  }

  draw() {
    this.shipContext.drawImage(this.imageRepository.spaceship, this.x, this.y);
    if (this.counter >= this.fireRate) {
      this.fire();
      this.counter = 0;
    }
  };

  move() {
    this.counter++;
    // Redraw the ship
    if (!this.isColliding) {
      this.shipContext.clearRect(this.x, this.y, this.imageRepository.spaceship.width, this.imageRepository.spaceship.height);
      this.x += this.speed;
      // Keep player within the screen
      if (this.x <= 0 || this.x >= this.canvasWidth - this.imageRepository.spaceship.width) {
        this.speed = this.speed*-1;
        this.x += this.speed;
      }
      this.draw();
    } else {
      this.isColliding = false;
      this.game.playerScore -= 10
    }
  }

  /*
   * Fires two bullets
   */
  fire() {
    this.bulletPool.getTwo(this.x + 55, this.y, 3,
      this.x + 95, this.y, 3);
  }
}
