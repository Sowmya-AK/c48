var lightningBolt,tyres,heartImg,track;
var bgImg,groundImg,trackImg,TyresImg;
var obstacleGroup;
var PLAY=1,END=0,gameState;
var gameOver,restart ,gameOverImg, restartImg,fuelG,fuelImg;
gameState = PLAY;

function preload(){
  lightningBoltImg=loadImage("assets/car1.jpg");
  trackImg=loadImage("assets/path.png");
  tyresImg=loadImage("assets/tyres.png");
  car3=loadImage("assets/car3.png");
  car4=loadImage("assets/car4.png");
  heartImg=loadImage("assets/heart.png")
  gameOverImg = loadImage("assets/gameover.png");
  restartImg = loadImage("assets/restart.png");
  fuelImg=loadImage("assets/fuel.png");
}

function setup(){
  createCanvas(1000,1000);
 
  track = createSprite(200,200);
  track.addImage(trackImg);
  track.scale=2.0;
  track.x = track.height /2;
  lightningBolt=createSprite(500,680,30,30);
  lightningBolt.addImage(lightningBoltImg);
  lightningBolt.scale=0.55;
 
  // create left Boundary
leftBoundary=createSprite(0,0,100,800);
leftBoundary.visible = false;

//create right Boundary
rightBoundary=createSprite(410,0,100,800);
rightBoundary.visible = false;
  
   for(var i=400;i<550;i+=50)
  {
  heart=createSprite(i,50,50,50);
  heart.addImage(heartImg);
  heart.scale=0.09;
  }

  obstacleGroup = new Group();
  fuelG=new Group();
  gameOver = createSprite(500,500);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(500,680);
  restart.addImage(restartImg);

  gameOver.visible = false;
  restart.visible = false;
  
}

function draw(){
 background(0)
  
  
  if(gameState===PLAY)
  {
    restart.visible=false;
    gameOver.visible=false;
    track.velocityY=5
    if(keyCode===87){
      lightningBolt.velocityY=-1;
      lightningBolt.addImage(lightningBoltImg);
    }
    if(keyCode===68){
      lightningBolt.velocityX=5;
      lightningBolt.addImage(car3);
    }
    if(keyCode===65){
      lightningBolt.velocityX=-5;
      lightningBolt.addImage(car4);
    }
    if (track.y>400){
      track.y =300;
    }
  
    if(lightningBolt.isTouching(obstacleGroup))
    {  heart.destroy();
       obstacleGroup.destroyEach();
        
    }
   
    if(gameState===END)
    {
      gameOver.visible = true;
      restart.visible = true;
      lightningBolt.velocityY=0;
      obstaclesGroup.setLifetimeEach(-1);
       
      if(mousePressedOver(restart)) {
        reset();
      }
    }
  }
 

  fuels();
  spawnObstacles();
  edges= createEdgeSprites();
  lightningBolt.collide(edges[3]);
  lightningBolt.collide(leftBoundary);
  lightningBolt.collide(rightBoundary);
  drawSprites();
}
function spawnObstacles(){
  
  if(frameCount%170===0){
  tyres=createSprite(200,200,30,30);
  tyres.scale=0.09;
  tyres.addImage(tyresImg);
  tyres.velocityY=5;
  tyres.lifetime=2000;
  tyres.x=Math.round(random(100,500))
  obstacleGroup.add(tyres);
 
  }
}

function fuels(){
  if(frameCount%340===0){
  fuel=createSprite(200,140,30,30);
  fuel.scale=0.10;
  fuel.addImage(fuelImg);
  fuel.velocityY=5;
  fuel.lifetime=2000;
  
    
  fuel.x=Math.round(random(100,500))
  fuelG.add(fuel);
  }
 }
 function reset(){
  gameState = PLAY;
  
  restart.visible = false;
  gameOver.visible=false;
  pbstacleGroup.destroyEach();
  
  fuelG.destroyEach();
 
 
  
}
