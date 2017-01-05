import {Bullet} from "./bullet";
import {Enemy} from "./enemy";
import {ImageRepository} from "./imageRepository";
/**
 * Custom Pool object. Holds Bullet objects to be managed to prevent
 * garbage collection.
 * The pool works as follows:
 * - When the pool is initialized, it popoulates an array with
 *   Bullet objects.
 * - When the pool needs to create a new object for use, it looks at
 *   the last item in the array and checks to see if it is currently
 *   in use or not. If it is in use, the pool is full. If it is
 *   not in use, the pool "spawns" the last item in the array and
 *   then pops it from the end and pushed it back onto the front of
 *   the array. This makes the pool have free objects on the back
 *   and used objects in the front.
 * - When the pool animates its objects, it checks to see if the
 *   object is in use (no need to draw unused objects) and if it is,
 *   draws it. If the draw() function returns true, the object is
 *   ready to be cleaned so it "clears" the object and uses the
 *   array function splice() to remove the item from the array and
 *   pushes it to the back.
 * Doing this makes creating/destroying objects in the pool
 * constant.
 */
export class Pool {
  size: number; // Max bullets allowed in the pool
  pool = [];
  imageRepository: ImageRepository;
  mainContext;
  constructor(maxSize: number, imageRepository: ImageRepository, mainContext) {
    this.size = maxSize;
    this.imageRepository = imageRepository;
    this.mainContext = mainContext;
  }

  getPool() {
    var obj = [];
    for (var i = 0; i < this.size; i++) {
      if (this.pool[i].alive) {
        obj.push(this.pool[i]);
      }
    }
    return obj;
  }

  /*
   * Populates the pool array with the given object
   */
  init(object, bulletPool: Pool) {
    if (object == "bullet") {
      for (var i = 0; i < this.size; i++) {
        // Initalize the object
        var bullet = new Bullet("bullet", this.mainContext, this.imageRepository);
        bullet.x = 0;
        bullet.y = 0;
        bullet.width = this.imageRepository.bullet.width;
        bullet.height = this.imageRepository.bullet.height;
        bullet.collidableWith = "enemy";
        bullet.type = "bullet";
        this.pool[i] = bullet;
      }
    }
    else if (object == "enemy") {
      console.log('enemy size : ' + this.size);
      for (var i = 0; i < this.size; i++) {
        var enemy = new Enemy(this.imageRepository, this.mainContext, bulletPool);
        enemy.x = 0;
        enemy.y = 0;
        enemy.width = this.imageRepository.enemy.width;
        enemy.height = this.imageRepository.enemy.height;
        this.pool[i] = enemy;
      }
    }
    else if (object == "enemyBullet") {
      for (var i = 0; i < this.size; i++) {
        var bullet = new Bullet("enemyBullet", this.mainContext, this.imageRepository);
        bullet.x = 0;
        bullet.y = 0;
        bullet.width = this.imageRepository.enemyBullet.width;
        bullet.height = this.imageRepository.enemyBullet.height;
        bullet.collidableWith = "ship";
        bullet.canvasHeight = 720;
        bullet.type = "enemyBullet";
        this.pool[i] = bullet;
      }
    }
  };

  /*
   * Grabs the last item in the list and initializes it and
   * pushes it to the front of the array.
   */
  get(x, y, speed) {
    if (!this.pool[this.size - 1].alive) {
      this.pool[this.size - 1].spawn(x, y, speed);
      this.pool.unshift(this.pool.pop());
    }
  };

  /*
   * Used for the ship to be able to get two bullets at once. If
   * only the get() function is used twice, the ship is able to
   * fire and only have 1 bullet spawn instead of 2.
   */
  getTwo(x1, y1, speed1, x2, y2, speed2) {
    if (!this.pool[this.size - 1].alive && !this.pool[this.size - 2].alive) {
      this.get(x1, y1, speed1);
      this.get(x2, y2, speed2);
    }
  };

  /*
   * Draws any in use Bullets. If a bullet goes off the screen,
   * clears it and pushes it to the front of the array.
   */
  animate() {
    for (var i = 0; i < this.size; i++) {
      // Only draw until we find a bullet that is not alive
      if (this.pool[i].alive) {
        if (this.pool[i].draw()) {
          this.pool[i].clear();
          this.pool.push((this.pool.splice(i, 1))[0]);
        }
      }
      else
        break;
    }
  };
}
