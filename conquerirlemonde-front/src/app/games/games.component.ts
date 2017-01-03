import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

//declare var Game: any;

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements AfterViewInit {

  @ViewChild("background") bgCanvas: ElementRef;
  @ViewChild("main") mainCanvas: ElementRef;
  @ViewChild("ship") shipCanvas: ElementRef;

  background: Background;
  ship: Ship;
  enemyPool: Pool;
  enemyBulletPool: Pool;

  //game: any;
  spaceship = new Image();
  bullet = new Image();
  enemy = new Image();
  enemyBullet = new Image();
  enemyXIndex = 0;
  enemyYIndex = 0;
  nextEnemyX = 100;
  nextEnemyY = 250;
  bgContext: any;
  shipContext: any;
  mainContext: any;
  nextEnemySpacer: any;
  imageRepository = new ImageRepository();

  constructor() { }

  ngAfterViewInit() {
    this.init();
    this.start();
    this.updateGame();
  }

  updateGame() {
    Observable.interval(1000 / 60)
      .subscribe(() => {
        this.animate();
      });
  }
  start() {
    //this.ship.draw();
    this.animate();
  };

  animate() {

  	this.background.draw();
  }
  init() {
    this.enemyXIndex = 0;
    this.enemyYIndex = 0;
    this.nextEnemyX = 100;
    this.nextEnemyY = 250;
    this.nextEnemySpacer = this.enemy.height * 1.5;

    // Test to see if canvas is supported. Only need to
    // check one canvas
    if (this.bgCanvas.nativeElement.getContext) {
      this.bgContext = this.bgCanvas.nativeElement.getContext('2d');

      // Initialize objects to contain their context and canvas
      // information

      /*
            //Ship.prototype.context = this.shipContext;
            //Ship.prototype.canvasWidth = this.shipCanvas.width;
            //Ship.prototype.canvasHeight = this.shipCanvas.height;
      
            //Bullet.prototype.context = this.mainContext;
            //Bullet.prototype.canvasWidth = this.mainCanvas.width;
            //Bullet.prototype.canvasHeight = this.mainCanvas.height;
      
            /*Enemy.prototype.context = this.mainContext;
            Enemy.prototype.canvasWidth = this.mainCanvas.width;
            Enemy.prototype.canvasHeight = this.mainCanvas.height;
      */
      // Initialize the background object
      this.background = new Background(this.imageRepository, this.bgContext, this.bgCanvas.nativeElement);
      //this.background
      //this.background.init(0, 0); // Set draw point to 0,0

      // Initialize the ship object
      //this.ship = new Ship(525, 570, this.imageRepository.spaceship.width, this.imageRepository.spaceship.height, this.imageRepository, this.shipContext, this.mainContext);
      //this.ship.init(525, 570, imageRepository.spaceship.width, imageRepository.spaceship.height);

      // Initialize the enemy pool object
      //this.enemyPool = new Pool(150, this.imageRepository, this.mainContext);
      //this.enemyPool.init("enemy");

      //this.enemyBulletPool = new Pool(50, this.imageRepository, this.mainContext);
      //this.enemyBulletPool.init("enemyBullet");

      // Start QuadTree
      /* this.quadTree = new QuadTree({ x: 0, y: 0, width: this.mainCanvas.width, height: this.mainCanvas.height });
 
      this.playerScore = 5000;
 
      document.getElementById('loading').style.display = "none";
      game.start();*/
    }
  };


}
abstract class Drawable {
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
  };
}
class Background extends Drawable {
  speed = 1; // Redefine speed of the background for panning
  context: any;
  imageRepository: ImageRepository;

  constructor(imageRepository: ImageRepository, bgContext: any, bgCanvas: any) {
    super(0, 0, 0, 0);
    this.imageRepository = imageRepository;
    this.context = bgContext;
    this.canvasWidth = bgCanvas.width;
    this.canvasHeight = bgCanvas.height;
  }

  // Implement abstract function
  draw() {
    // Pan background
    this.y += this.speed;
    //this.context.clearRect(0,0, this.canvasWidth, this.canvasHeight);
    this.context.drawImage(this.imageRepository.background, this.x, this.y);

    // Draw another image at the top edge of the first image
    this.context.drawImage(this.imageRepository.background, this.x, this.y - this.canvasHeight);

    // If the image scrolled off the screen, reset
    if (this.y >= this.canvasHeight)
      this.y = 0;
  };
  move() { }
}


class Bullet extends Drawable {
  alive = false; // Is true if the bullet is currently in use
  self: any;
  imageRepository: ImageRepository;
  context: any;

  constructor(object, mainContext) {
    super(0, 0, 0, 0);
    this.self = object;
    this.context = mainContext;
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
    this.context.clearRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
    this.y -= this.speed;

    if (this.isColliding) {
      return true;
    }
    else if (this.self === "bullet" && this.y <= 0 - this.height) {
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


/**
 * Create the Enemy ship object.
 */
class Enemy extends Drawable {
  percentFire = .01;
  chance = 0;
  alive = false;
  collidableWith = "bullet";
  type = "enemy";
  speedX = 0;
  speedY;
  leftEdge;
  rightEdge;
  bottomEdge;
  context: any;
  imageRepository: ImageRepository;

  constructor(imageRepository: ImageRepository, bgMain: any) {
    super(0, 0, 0, 0);
    this.imageRepository = imageRepository;
    this.context = bgMain;
  }

	/*
	 * Sets the Enemy values
	 */
  spawn(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.speedX = 0;
    this.speedY = speed;
    this.alive = true;
    this.leftEdge = this.x - 90;
    this.rightEdge = this.x + 90;
    this.bottomEdge = this.y + 140;
  };

	/*
	 * Move the enemy
	 */
  draw() {
    this.context.clearRect(this.x - 1, this.y, this.width + 1, this.height);
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x <= this.leftEdge) {
      this.speedX = this.speed;
    }
    else if (this.x >= this.rightEdge + this.width) {
      this.speedX = -this.speed;
    }
    else if (this.y >= this.bottomEdge) {
      this.speed = 1.5;
      this.speedY = 0;
      this.y -= 5;
      this.speedX = -this.speed;
    }

    if (!this.isColliding) {
      this.context.drawImage(this.imageRepository.enemy, this.x, this.y);

      // Enemy has a chance to shoot every movement
      this.chance = Math.floor(Math.random() * 101);
      if (this.chance / 100 < this.percentFire) {
        this.fire();
      }

      return false;
    }
    else {
      return true;
    }
  };
  move() { }

  /*
   * Fires a bullet
   */
  fire() {
    //game.enemyBulletPool.get(this.x + this.width / 2, this.y + this.height, -2.5);
  };

  /*
   * Resets the enemy values
   */
  clear() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.alive = false;
    this.isColliding = false;
  };
}

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
class Pool {
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
  init(object) {
    if (object == "bullet") {
      for (var i = 0; i < this.size; i++) {
        // Initalize the object
        var bullet = new Bullet("bullet", this.mainContext);
        bullet.x = 0;
        bullet.y = 0;
        bullet.width = this.imageRepository.bullet.width;
        bullet.height = this.imageRepository.bullet.width;
        bullet.collidableWith = "enemy";
        bullet.type = "bullet";
        this.pool[i] = bullet;
      }
    }
    else if (object == "enemy") {
      console.log('enemy size : ' + this.size);
      for (var i = 0; i < this.size; i++) {
        var enemy = new Enemy(this.imageRepository, this.mainContext);
        enemy.x = 0;
        enemy.y = 0;
        enemy.width = this.imageRepository.enemy.width;
        enemy.height = this.imageRepository.enemy.height;
        this.pool[i] = enemy;
      }
    }
    else if (object == "enemyBullet") {
      for (var i = 0; i < this.size; i++) {
        var bullet = new Bullet("enemyBullet", this.mainContext);
        bullet.x = 0;
        bullet.y = 0;
        bullet.width = this.imageRepository.enemyBullet.width;
        bullet.height = this.imageRepository.enemyBullet.width;
        bullet.collidableWith = "ship";
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

/**
 * Create the Ship object that the player controls. The ship is
 * drawn on the "ship" canvas and uses dirty rectangles to move
 * around the screen.
 */
class Ship extends Drawable {
  speed = 3;
  bulletPool;
  fireRate = 15;
  counter = 0;
  imageRepository: ImageRepository;
  alive = true;
  shipContext;
  mainContext;

  constructor(x, y, width, height, imageRepository: ImageRepository, shipContext, mainContext) {
    super(x, y, width, height);
    this.imageRepository = imageRepository;
    this.collidableWith = "enemyBullet";
    this.type = "ship";
    this.isColliding = false;
    this.bulletPool = new Pool(30, imageRepository, mainContext);
    this.bulletPool.init("bullet");
    this.shipContext = shipContext;
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
      this.shipContext.clearRect(this.x, this.y, this.width, this.height);
      this.x += this.speed;
      // Keep player within the screen
      if (this.x <= 0 || this.x >= this.canvasWidth - this.width) {
        this.speed = this.speed * -1;
        this.x += this.speed;
      }
      this.draw();
    } else {
      this.isColliding = false;
      //game.playerScore -= 10;
    }
  };

  /*
   * Fires two bullets
   */
  fire() {
    this.bulletPool.getTwo(this.x + 55, this.y, 3,
      this.x + 95, this.y, 3);
  };
}

class ImageRepository {
  // Define images
  background = new Image();
  spaceship = new Image();
  bullet = new Image();
  enemy = new Image();
  enemyBullet = new Image();

  constructor() {
    // Set images src
    this.background.src = "/assets/games/imgs/bg.png";
    this.spaceship.src = "/assets/games/imgs/ship.png";
    this.bullet.src = "/assets/games/imgs/bullet.png";
    this.enemy.src = "/assets/games/imgs/enemy.png";
    this.enemyBullet.src = "/assets/games/imgs/bullet_enemy.png";
  }

}

