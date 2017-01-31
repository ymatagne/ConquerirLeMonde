import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { QuadTreeDetection } from "./invader/quadTreeDetection";
import { Ship } from "./invader/ship";
import { Background } from "./invader/background";
import { Pool } from "./invader/pool";
import { ImageRepository } from "./invader/imageRepository";
import {Trooper} from '../trooper';
import { TrooperService } from '../trooper.service';
import { WebSocketService } from '../websocket.service';


//declare var Game: any;

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
  providers: [TrooperService, WebSocketService]
})
export class GamesComponent implements AfterViewInit {

  constructor(private trooperService: TrooperService) {
    trooperService.trooper.subscribe(trooper => {
      this.launchEnnemy(trooper);
    });
  }
  ws: any;


  @ViewChild("background") bgCanvas: ElementRef;
  @ViewChild("main") mainCanvas: ElementRef;
  @ViewChild("ship") shipCanvas: ElementRef;

  background: Background;
  ship: Ship;
  enemyPool: Pool;
  enemyBulletPool: Pool;
  quadTree: QuadTreeDetection;

  //game: any;
  enemyXIndex = 0;
  enemyYIndex = 0;
  nextEnemyX = 100;
  nextEnemyY = 250;
  bgContext: any;
  shipContext: any;
  mainContext: any;
  imageRepository = new ImageRepository();

  playerScore = 5000;
  message = "";

  ngAfterViewInit() {
    setTimeout(_ => {
      this.init();
      this.start();
      this.updateGame();
    });
  }

  updateGame() {
    Observable.interval(1000 / 60)
      .subscribe(() => {
        this.animate();
      });
  }

  start() {
    this.ship.draw();
    this.animate();
  }

  animate() {
    if (this.playerScore > 0) {
      // Insert objects into quadtree
      this.quadTree.clear();
      this.quadTree.insert(this.ship);
      this.quadTree.insert(this.ship.bulletPool.getPool());
      this.quadTree.insert(this.enemyPool.getPool());
      this.quadTree.insert(this.enemyBulletPool.getPool());

      this.detectCollision();

      this.background.draw();
      this.ship.move();
      this.ship.bulletPool.animate();
      this.enemyPool.animate();
      this.enemyBulletPool.animate();

    } else {
      this.message = "Mission Accomplie !!!";
    }
  }

  init() {
    this.enemyXIndex = 0;
    this.enemyYIndex = 0;
    this.nextEnemyX = 100;
    this.nextEnemyY = 250;

    // Test to see if canvas is supported. Only need to
    // check one canvas
    if (this.bgCanvas.nativeElement.getContext) {
      this.bgContext = this.bgCanvas.nativeElement.getContext('2d');
      this.shipContext = this.shipCanvas.nativeElement.getContext('2d');
      this.mainContext = this.mainCanvas.nativeElement.getContext('2d');

      // Initialize objects to contain their context and canvas
      // information

      // Initialize the background object
      this.background = new Background(this.imageRepository, this.bgContext, this.bgCanvas.nativeElement);
      this.ship = new Ship(525, 570, this.imageRepository, this.shipContext, this.shipCanvas.nativeElement, this.mainContext, this);


      this.enemyBulletPool = new Pool(50, this.imageRepository, this.mainContext);
      this.enemyBulletPool.init("enemyBullet", undefined);

      this.enemyPool = new Pool(150, this.imageRepository, this.mainContext);
      this.enemyPool.init("enemy", this.enemyBulletPool);

      // Start QuadTree
      this.quadTree = new QuadTreeDetection({ x: 0, y: 0, width: this.mainCanvas.nativeElement.width, height: this.mainCanvas.nativeElement.height }, 0);
    }
  }

  // Spawn a new wave of enemies
  launchEnnemy(trooper:Trooper) {
    var enemy = this.enemyPool.get(this.nextEnemyX, this.nextEnemyY, 2);
    enemy.setTrooper(trooper);

    var nextEnemySpacer = -enemy.image.height * 1.5;
    this.nextEnemyX += enemy.image.width + 25;

    if (this.enemyXIndex % 15 == 0) {
      this.nextEnemyX = 100;
      this.nextEnemyY += nextEnemySpacer;
      this.enemyYIndex++;
      this.enemyXIndex = 0;
    }
    if (this.enemyYIndex % 10 == 0) {
      this.nextEnemyX = 100;
      this.nextEnemyY = 250;
      this.enemyYIndex = 1;
      this.enemyXIndex = 0
    }
    this.enemyXIndex++;
  }

  detectCollision() {
    var objects = [];

    this.quadTree.getAllObjects(objects);
    var len = objects.length

    for (var x = 0; x < len; x++) {
      var obj = [];
      this.quadTree.findObjects(obj, objects[x]);

      for (var y = 0, length = obj.length; y < length; y++) {

        // DETECT COLLISION ALGORITHM
        if (objects[x].collidableWith === obj[y].type &&
          (objects[x].x < obj[y].x + obj[y].width &&
            objects[x].x + objects[x].width > obj[y].x &&
            objects[x].y < obj[y].y + obj[y].height &&
            objects[x].y + objects[x].height > obj[y].y)) {


          if (obj[y].type === "enemy") {
            if(this.trooperService.dropTrooper(obj[y].trooper)){
              objects[x].isColliding = true;
              obj[y].isColliding = true;
            }
          }else {
            objects[x].isColliding = true;
            obj[y].isColliding = true;
          }
        }
      }
    }
  };

}
