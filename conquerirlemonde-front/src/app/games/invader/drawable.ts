export abstract class Drawable {
    y: number;
    x: number;
    image: HTMLImageElement;
    speed: number = 0;
    canvasWidth = 0;
    canvasHeight = 0;
    collidableWith = "";
    isColliding = false;
    type = "";

    constructor(x, y, image: HTMLImageElement) {
        // Defualt variables
        this.x = x;
        this.y = y;
        this.image = image;
    }

    get width(): number {
        return this.image.width;
    };

    get height(): number {
        return this.image.height;
    };

    // Define abstract function to be implemented in child objects
    abstract draw();

    abstract move();

    isCollidableWith(object) {
        return (this.collidableWith === object.type);
    }
}
