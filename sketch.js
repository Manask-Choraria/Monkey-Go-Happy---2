

//creating variables
var bananaImage,obstacle,obstacleImage,background1,backgroundImage,ground,playerAnimation,player,gameState,PLAY,END,ground,count,
score

function preload(){
//loading Images and Animation

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  backgroundImage = loadImage("jungle.jpg");
  playerAnimation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png",
  "Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")

}

function setup() {

  createCanvas (800,400);
  background1 = createSprite(0,0,800,400)
  background1.addImage(backgroundImage);
  background1.scale = 2;
  background1.x = background1.width/2;
  background1.velocityX = -4;
  player = createSprite(45,345,10,10);
  player.addAnimation("running",playerAnimation);
  player.scale = 0.100;
  

  END = 6;
  PLAY = 2;
  count = 3;
 gameState = PLAY;
  score = 0;
  
  ground = createSprite (400,345,800,10);
  ground.visible = false;
  
  

//creating new groups
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  
}

  


function draw() {
  background("white");
  
  if(gameState === PLAY){
    
      fruits();
    obstacle();
    
   
    
          
    
    
     if(keyDown("space")&& player.isTouching(ground)) {
    player.velocityY = -10;
    }
  else{
     player.collide(ground) ;  
  }
    
  
     player.velocityY = player.velocityY +0.8;
     
    
  
  if (background1.x < 0){
    background1.x = background1.width/2;
  }
  
       switch(score){
        case 10: player.scale = 0.12;
          break;
          case 20: player.scale = 0.14;
          break;
          case 30: player.scale = 0.16;
          break;
          case 90: player.scale = 0.18;
          break;
          default:break;
       }
          
    if(obstacleGroup.isTouching(player)) {
      count = count+1
      obstacleGroup.destroyEach(); 
    }
      switch(count){
        case 4: player.scale = player.scale - 0.5;
          break;
          case 5: player.scale = player.scale - 0.5;
          break;
          case 6: gameState = END;
          break;
          
          default:break;
       }
    
    
    if(foodGroup.isTouching(player)){
    score = score+2;
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
    }
    
    
    }
  if(gameState === END){
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    textSize(45);
     text("GAME OVER",400,235);
     background1 .velocityX = 0;
     player.visible = false;
   
    
  }
        
          
      
      
         
      
    
    
   
  
  
  drawSprites();
     
      text("Score: "+ score, 500,50);
}
function fruits(){
  if(frameCount% 80 ===0){
    var banana = createSprite(600,(random(235,255)),10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.0285;
    banana .velocityX = -9;
    foodGroup.add(banana);
  }
}
function obstacle(){
  if(frameCount%300 === 0){
    var stone = createSprite(800,360,10,10);
    stone.addImage(obstacleImage);
    stone.scale = 0.170;
    stone.velocityX = -9;
    obstacleGroup.add(stone);
  }
}




