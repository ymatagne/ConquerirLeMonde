import { Drawable } from "./drawable";
import { ImageRepository } from "./imageRepository";

export class Bullet extends Drawable {
    alive = false; // Is true if the bullet is currently in use
    self: any;
    image: HTMLImageElement;
    context: any;

    constructor(object, mainContext, imageRepository: ImageRepository) {
        super(0, 0, null);
        this.self = object;
        this.context = mainContext;

        if (this.self === "bullet") {
            this.image = imageRepository.bullet;
        }
        else if (this.self === "enemyBullet") {
            this.image = imageRepository.enemyBullet;
        }
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
            this.context.drawImage(this.image, this.x, this.y);
            return false;
        }
    };

    move() {
    }

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
