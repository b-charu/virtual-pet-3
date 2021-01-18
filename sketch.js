//Create variables here
var dog,dogImg,happyDog;
var database;
var food1,foodStock, addFoodStock;
var foodObj;
var feed,foodTime,lfeed;
var time;
var gameState1,readState;

function preload()
{
  dogImg = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  bedroom = loadImage("images/Bed Room.png");

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  foodTime = database.ref('feedTime');
  foodTime.on("value",function(data){
    lfeed = data.val();
  });

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState1 = data.val();
  });
  
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.3

  feed = createButton("Feed The Dog");
  feed.position(550,95);
  feed.mousePressed(feedDog);
  
  addFoodStock = createButton("Add The Food");
  addFoodStock.position(700,95);
  addFoodStock.mousePressed(addFood);
  
}


function draw() {  
  //background(46,139,87);
 
  time= hour();
  //console.log(time);
  text("current time : "+time,20,20);
 
if(time === (lfeed+1))
{
  update("playing");
  foodObj.garden();
}
else if(time === (lfeed+2))
{
  update("sleeping");
  foodObj.bedroom();
}
else if(time>(lfeed+2) && time<=(lfeed+4))
{
  update("bathing");
  foodObj.washroom();
}
else{
  update("Hungry");
  foodObj.display();
}

 if(gameState1 != "Hungry")
 {
   feed.hide();
   addFoodStock.hide();
   dog.remove();
 }
 else
 {
   feed.show();
   addFoodStock.show();
   dog.addImage(dogImg);
 }
 
  drawSprites();

}

function readStock(data)
{
  food1 = data.val();
  foodObj.updateFoodStock(food1);
}
 
function feedDog()
{
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour(),
    gameState:"Hungry"
  });
}

function addFood()
{
  food1++;
  database.ref('/').update({
    food:food1
  })
}

function update(state)
{
  database.ref('/').update({
    gameState : state
  })
}

