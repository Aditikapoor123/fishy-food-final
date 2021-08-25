var arrow, score=0, targetGroup
var gameState = 0;
var storyImage, playButton,temp=0,player,color=255
var background1, targetImage , fishImage, playerImage
function preload(){
  storyImage=loadImage("story.jpg")
background1= loadImage("Background.gif")
targetImage=loadImage("Worm.png")
fishImage=loadImage("fish.png")
playerImage=loadImage("Reef.png")


}

function setup(){
  canvas = createCanvas(windowWidth , windowHeight);
  playButton=createButton("PLAY")
  playButton.position(windowWidth/2,windowHeight-80)
  player = createSprite (80,windowHeight/2,30,30)
  player.addImage(playerImage)

  arrow= createSprite(windowWidth+100,player.y,50,15)
  arrow.addImage(fishImage)
  arrow.scale=0.2


  arrow.shapeColor="blue"
  targetGroup=new Group()
}


function draw(){
  if(gameState==0){

background("#16f2fa")
fill("black") 
textFont("Georgia");
textSize(30);
text("FISHY FOOD ",windowWidth/2-20,40);
text("Press the space bar to create a fish. \n Use the arrow keys to capture the worms", windowWidth/4,windowHeight/2)

//imageMode (CENTER)
//image(storyImage,windowWidth/2,windowHeight/2,windowWidth-100,windowHeight-100)
playButton.mousePressed(()=>{
  gameState=1
  playButton.hide();
  
})
  }
  else if(gameState==1){
  
    //image(background1,windowWidth/2,windowHeight/2,windowWidth,windowHeight)
    if(background1){ background(background1); }
    
    if(frameCount%30==0&& temp<5){
      
      temp=temp+1
      
    }
    if(temp<5){
      
      textSize(35)
      fill("black")
     // text("instructions ",windowWidth/2-100,80)
      //text("To play this game press your space bar to create a fish. Then with the help of the arrow keys move it to catch the worms")
    }
    fill(color,0,0)
   color=random(0,255)
    ellipse(windowWidth-100,windowHeight/2,10,10)
    if(frameCount%100==0){
      var target =createSprite(windowWidth-100,windowHeight/2,20,20)
      target.addImage(targetImage)
      target.scale=0.2
      target.setCollider("circle",0,0,30)
      target.velocityX= random(-10,-2)
      target.velocityY= random(-5,5)
      target.lifetime=500
      targetGroup.add(target)

    }
    if(keyDown("space")||mouseWentDown()){
      if(arrow.x<0||arrow.x>windowWidth){
      console.log("touches array")
     arrow.x=player.x
     arrow.y=player.y
     arrow.velocityX= 5
     arrow.velocityY=0
      }
    }
    /*if(keyDown("up")){
      arrow.rotation=arrow.rotation-10
      arrow.velocityY=arrow.velocityY -1
    }
    if(keyDown("down")){
      arrow.rotation=arrow.rotation+10
      arrow.velocityY=arrow.velocityY+1
    
    }
    */
    if(arrow.isTouching(targetGroup)){
       targetGroup.destroyEach()
       score=score+10

    }
     textSize(30)
    fill("black")
     text("score:" + score,windowWidth-150,50)
    drawSprites();
    if(frameCount===500){
      gameState=2;
    
    }
  }
else if (gameState==2){
  textSize(25);
  fill("black")
  text ("Game Over", windowWidth/2,100 );
  text("score:" + score,windowWidth/2,windowHeight/2);
}
}
function mousePressed(){
  console.log("mouse is pressed");
if(arrow.x<0||arrow.x>windowWidth){
  console.log("mouse is creating fish"); 
  arrow.x=player.x;
  arrow.y=player.y;
  arrow.velocityX= 5;
  arrow.velocityY=0;

}

}
function mouseDragged(){
  console.log("mouse is dragged");
  if( gameState==1){
    arrow.y=mouseY
  }
  
}

