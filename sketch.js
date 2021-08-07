const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var backgroundImg, platform;
var ball
var rec1, rec2
var backboard
var scoreboard = 0
var gameState = "start";
var restart;
var sbimg;
var check=true;
var reset

function preload() {
   backboard = loadImage("RIM_prev_ui_prev_ui.png")
    sbimg = loadImage ("Scoreboard_prev_ui.png")
    reset = loadImage("Restart_prev_ui.png")
}

function setup(){
    var canvas = createCanvas(windowWidth,windowHeight-115);
    engine = Engine.create();
    world = engine.world;
    restart = createSprite(displayWidth/2,(displayHeight)/2,100,40)
    restart.visible = false;
    restart.addImage(reset);
    restart.scale = 0.5;
    // x,y,width,height
    ground = new Ground(displayWidth/2,height,displayWidth,50)
    ball = new Round(300,300,50)
    rec1 = new Ground(displayWidth - 200,230,10,280)
    rec2 = new Ground(displayWidth - 380,230,10,10)
}

function draw(){
    background("skyblue");
    drawSprites();
    Engine.update(engine);
    ground.display()
    ball.display()
    // rec1.display()
    // rec2.display()
    push()
    strokeWeight(15)
    line(1720,100,1720,940)
    pop()
    image(backboard,1250,23 )

    if((ball.body.position.x>1610 && ball.body.position.x<1730 )&& (ball.body.position.y>250 && ball.body.position.y<300)){
        if(check){
            scoreboard = scoreboard + 1;
            check = false;
        }
        gameState = "scored"
    }

    if(gameState === "scored"){
        textSize(30)
    // text("Restart" ,displayWidth/2,(displayHeight-115)/2)
    restart.visible = true
    if(mousePressedOver(restart)){
        gameState="start";
        check = true;
        Matter.Body.setPosition(ball.body,{x:300,y:300})
        restart.visible = false;
    }
    }

    // rect(1610,250,120,50);
    image(sbimg,100,60,500,250)
    fill("white")
    text(scoreboard,250,110);
    // text(ball.body.position.x+","+ball.body.position.y,100,100);
}

function mouseDragged(){
    // ball.body.position.x = mouseX;
    // ball.body.position.y = mouseY
}

function keyPressed(){
    if(keyCode===32){
        console.log("pressing space")
        Matter.Body.applyForce(ball.body, {x:ball.body.position.x,y:ball.body.position.y}, {x:50,y:-70})
    }
}
