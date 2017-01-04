export class ImageRepository {
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
