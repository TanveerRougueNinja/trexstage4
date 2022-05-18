var PLAY = 1
var END = 0
var Gamestate = PLAY

var Cloudgroup,Obstaclegroup,Score 
var gameOver,restart,gameOverImage,restartImage
var trex, trex_running,trex_collided
var ground, ground2,ground_image 
var cloud_image,Cloud
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6 ;

function preload() {
    //uploading images
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png") 
 ground_image=loadImage("ground2.png")
 cloud_image=loadImage("cloud.png")
 obstacle1=loadImage("obstacle1.png")
 obstacle2=loadImage("obstacle2.png")
 obstacle3=loadImage("obstacle3.png")
 obstacle4=loadImage("obstacle4.png")
 obstacle5=loadImage("obstacle5.png")
 obstacle6=loadImage("obstacle6.png")
 trex_collided=loadAnimation("trex_collided.png")
 gameOverImage=loadImage("gameOver.png")
 restartImage=loadImage("restart.png")
 }
 
 function setup(){
   createCanvas(600,200)
   //creating trex
   trex=createSprite(50,180,20,50)
   trex.addAnimation("running",trex_running)
   trex.addAnimation("collided",trex_collided)
   trex.scale=0.5
   trex.setCollider("circle",0,0,35)
   trex.debug=false
   
   gameOver=createSprite(300,100)
   gameOver.addImage(gameOverImage)
   restart=createSprite(300,140)
   restart.addImage(restartImage)  
  gameOver.scale=0.5;
  restart.scale=0.5;

// creating ground
   ground=createSprite(200,180,400,20)
   ground.addImage("ground",ground_image)
   ground.x=ground.width/2

   //creating  invisible ground
   ground2=createSprite(200,190,400,10);
   ground2.visible=false
   Obstaclegroup=createGroup();
   Cloudgroup=createGroup();
   Score=0;


 } 

  function draw (){
    background(250)

text("Score: " +Score,500,50);

if(Gamestate===PLAY){
       //adding speed to ground
       ground.velocityX=-2;
       gameOver.visible=false
       restart.visible=false
Score=Score+Math.round(frameCount/60)
       //making the ground infinetly
       if(ground.x<0){
         ground.x=200;
       }
   
       //making trex jump upward
       if(keyDown("space") && trex.y>=150){
         trex.velocityY=-10
       }
      //adding gravity
     trex.velocityY=trex.velocityY+0.8;
   
     //puting the trex on invisible ground
  
     spawnClouds();
     SpawnObstacle();
if(Obstaclegroup.isTouching(trex))  {
  Gamestate=END
} 
}
else if (Gamestate===END){
  gameOver.visible=true
  restart.visible=true
ground.velocityX=0
trex.velocityY=0;
trex.changeAnimation("collided",trex_collided);
Obstaclegroup.setVelocityXEach(0)
Cloudgroup.setVelocityXEach(0)
Obstaclegroup.setLifetimeEach(-1)
Cloudgroup.setLifetimeEach(-1)

}

trex.collide(ground2)

  drawSprites();

}


function spawnClouds(){
    //9%3=modulo means whem you divide 2 nos you will get reminder as output
    // 9/3 means mhen you divide 2 nos you will get quotient as output
  if(frameCount %60===0){
    Cloud=createSprite(600,100,40,10)
    Cloud.addImage("cloud!",cloud_image) 
    Cloud.scale=0.4 ;
    Cloud.velocityX=-3;
    Cloud.lifetime=200;
    Cloud.depth=trex.depth
    trex.depth=trex.depth+1
    Cloudgroup.add (Cloud);

  }

}
function SpawnObstacle(){
  if (frameCount%60===0){
    var Obstacle = createSprite(400,165,10,40);
    Obstacle.velocityX=-6;
    var ran = Math.round(random(1,6));
      switch(ran){
      case 1:Obstacle.addImage(obstacle1);
      break;
      case 2:Obstacle.addImage(obstacle2);
      break;
      case 3:Obstacle.addImage(obstacle3);
      break;
      case 4:Obstacle.addImage(obstacle4);
      break;
      case 5:Obstacle.addImage(obstacle5);
      break;
      case 6:Obstacle.addImage(obstacle6);
      break;
      default:break
    }
    Obstacle.scale= 0.5;
    Obstacle.lifetime=300;
    Obstaclegroup.add(Obstacle);
  }
}