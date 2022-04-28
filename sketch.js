const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balasDeCañon=[];

var cannonBall;
var bote;
var balas=[];
var botes=[];
function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 20

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();
showBotes();
  for (var i=0; i<balasDeCañon.length; i++){
    multibalas(balasDeCañon[i],i)
  }
  cannon.display();
  //cannonBall.display();
 
  Matter.Body.setVelocity(bote.body,{
    x:-0.9,y:0 });
  bote.display();
 
}


function keyReleased() {
   if (keyCode === 32 || keyCode == "Space") {
      balasDeCañon[balasDeCañon.length-1].shoot(); }
    
     }
    function multibalas(bala,i){
if (bala){
bala.display();

}
    }
    function keyPressed(){
      var bala=new CannonBall(cannon.x,cannon.y);
      balasDeCañon.push(bala);
    }
    function showBotes(){
      if(botes.length>0){
if(botes[botes.length-1] === undefined || botes[botes.length-1].body.position.x<width-300){
var pociciones=[-40,-60,-70,-20];
var pocicion=random(pociciones)
bote= new Bote(width-70,height-60,170,170,pocicion);
        botes.push(bote);
        for(var i=0;i<botes.length;i++){
          if(botes[i]){
            Matter.Body.setVelocity(botes[i].body,{x:-0.9,y:0});
          }
        }
}
      }else{
        bote= new Bote(width-70,height-60,170,170,-80);
        botes.push(bote);
      }
    }
function juanicoComePapas(indice){
  for(var i=0;i<botes.length;i++){
if(balas[indice]!== undefined && botes[indice!== undefined]){
var colicion=Matter.SAT.collides(balas.body,botes.body);
if(colicion.cillided){
botes[i].remove();
}
}
  }
}