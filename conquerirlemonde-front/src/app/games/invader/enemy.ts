import { Drawable } from "./drawable";
import { Pool } from "./pool";
import { ImageRepository } from "./imageRepository";
import { Trooper } from "../../trooper";

/**
 * Create the Enemy ship object.
 */
export class Enemy extends Drawable {

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
    enemyBulletPool: Pool;
    trooper: Trooper;

    constructor(imageRepository: ImageRepository, mainContext: any, bulletPool: Pool) {
        super(0, 0, new Image());
        this.imageRepository = imageRepository;
        this.context = mainContext;
        this.image.src = "/assets/games/imgs/ship/enemy.png";
        this.enemyBulletPool = bulletPool;
    }

    setTrooper(trooper: Trooper) {
        this.trooper = trooper;
        this.image.src = "/assets/games/imgs/ship/" + trooper.image + ".png";

        //set default image in case of trouble
        if (!this.imageExists(this.image.src)) {
            this.image.src = "/assets/games/imgs/ship/enemy.png"
        }
    }

    imageExists(image_url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        return http.status != 404;
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
        this.leftEdge = 0;
        this.rightEdge = 1200-this.x;
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
            this.context.drawImage(this.image, this.x, this.y);

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

    move() {
    }

    /*
     * Fires a bullet
     */
    fire() {
        this.enemyBulletPool.get(this.x + this.width / 2, this.y + this.height, -2.5);
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
