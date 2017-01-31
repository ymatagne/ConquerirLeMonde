import { Drawable } from "./drawable";
import { ImageRepository } from "./imageRepository";

export class Background extends Drawable {
    speed = 1; // Redefine speed of the background for panning
    context: any;
    imageRepository: ImageRepository;

    constructor(imageRepository: ImageRepository, bgContext: any, bgCanvas: any) {
        super(0, 0, imageRepository.background);
        this.imageRepository = imageRepository;
        this.context = bgContext;
    }

    // Implement abstract function
    draw() {
        // Pan background
        this.y += this.speed;
        // this.context.clearRect(0,0, this.imageRepository.background.width, this.imageRepository.background.height);
        this.context.drawImage(this.image, this.x, this.y);

        // Draw another image at the top edge of the first image
        this.context.drawImage(this.image, this.x, this.y - this.height);

        // If the image scrolled off the screen, reset
      if (this.y >= this.height) {
        this.y = 0;
      }
    }

    move() {
    }
}
