var bow, arrow, redB, pinkB, greenB, blueB, birdImage, bird, ran, startButton,gameover, restart, victory
var bowImage, arrowImage, greenbImage, redbImage, pinkbImage, bluebImage, backgroundImage, startImage, victoryImage
var gameoverImage,restartImage, titleImage
var arrowGroup, redBGroup, pinkBGroup, blueBGroup, greenBGroup, birdGroup,title
var start = 0
var play = 1
var end = 2
var win = 3
var gamestate = start
var score = 0
var arrows = 25
var rans 


function preload() {

  backgroundImage = loadImage("bg.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  redbImage = loadImage("red_balloon0.png");
  greenbImage = loadImage("green_balloon0.png");
  pinkbImage = loadImage("pink_balloon0.png");
  bluebImage = loadImage("blue_balloon0.png");
  birdImage = loadAnimation("bird1.png", "bird2.png", "bird3.png")
  startImage = loadImage("start.png")
  gameoverImage = loadImage("gameover.png")
  restartImage = loadImage("reset.png")
  titleImage = loadImage("title.png")
  victoryImage = loadImage("victory.png")
}

function setup() {
  createCanvas(2000, 900);

  scene = createSprite(width / 2, height / 2, 4000, 900);
  scene.addImage(backgroundImage);

  bow = createSprite(1990, 220, 20, 50);
  bow.addImage(bowImage);
  bow.scale = 1;

  startButton = createSprite(width / 2, height / 2 + 50, 10, 10)
  startButton.addImage(startImage)
  startButton.scale = 0.5

  gameover = createSprite(width / 2, height / 2 - 100, 10, 10)
  gameover.addImage(gameoverImage)
  gameover.scale = 1

  restart = createSprite(width / 2, height / 2 + 100 , 10, 10)
  restart.addImage(restartImage)
  restart.scale = 0.25

  title = createSprite(width / 2, height / 2 -150, 10, 10)
  title.addImage(titleImage)
  title.scale = 1.5

  rans = Math.round(random(20,50))

  victory = createSprite(width / 2, height / 2 -170, 10, 10)
  victory.addImage(victoryImage)
  victory.scale = 1

  arrowGroup = new Group()
  redBGroup = new Group()
  blueBGroup = new Group()
  greenBGroup = new Group()
  pinkBGroup = new Group()
  birdGroup = new Group()
}
function draw() {
  background("black")
  drawSprites()
  if (gamestate === start) 
  {
    startButton.visible = true
    gameover.visible = false
    restart.visible = false
    title.visible = true
    victory.visible = false

    if(mousePressedOver(startButton))
    {
      gamestate = play
    }
  }

  else if (gamestate === play) 
  {
    scene.velocityX = -3
    if (scene.x < 0) 
    {
      scene.x = scene.width / 2;
    }

    startButton.visible = false
    gameover.visible = false
    restart.visible = false
    title.visible = false
    victory.visible = false

    if (frameCount % 30 === 0) 
    {
      switch (ran = Math.round(random(1, 5))) 
      {
        case 1: creategreenB()
          break;
        case 2: createredB()
          break;
        case 3: createblueB()
          break;
        case 4: createpinkB()
          break;
        case 5: createBird()
        default: break;
      }
    }
    
    overlaping()
  
    if (keyIsDown("32")) 
    {
      createArrow()
      arrows -= 1
    }
    bow.y = World.mouseY

    if(arrows === 0 && score < rans)
    {
      gamestate = end
    }

    if(score >= rans && arrows >= 0)
    {
      gamestate = win
    }
      
  textSize(50)
  fill("red")
  text("Score = "+ score + " / " + rans,1500,50)
  text("Number of Arrows = " + arrows,1400,100)
}
  
  else if (gamestate === end) 
  {
    gameover.visible = true
    restart.visible = true
    title.visible = false
    startButton.visible = false
    victory.visible = false
    birdGroup.destroyEach()
    arrowGroup.destroyEach()
    blueBGroup.destroyEach()
    greenBGroup.destroyEach()
    redBGroup.destroyEach()
    pinkBGroup.destroyEach()
    scene.velocityX = 0

    if(mousePressedOver(restart))
    {
      gamestate = play
      score = 0
      arrows = 25
    }
    

  textSize(50)
  fill("red")
  text("Score = "+ score + " / " + rans,1500,50)
  }
  
  if(gamestate === win)
  {
    restart.visible = true
    victory.visible = true
    birdGroup.destroyEach()
    arrowGroup.destroyEach()
    blueBGroup.destroyEach()
    greenBGroup.destroyEach()
    redBGroup.destroyEach()
    pinkBGroup.destroyEach()
    scene.velocityX = 0
    if(mousePressedOver(restart))
    {
      gamestate = play
      score = 0
      arrows = 25
    }
    textSize(50)
    fill("red")
    text("Score = "+ score + " / " + rans,1500,50)
  }
}

function createArrow() {
  arrow = createSprite(bow.x, bow.y, 10, 10)
  arrow.addImage(arrowImage)
  arrow.scale = 0.4
  arrow.velocityX = -4
  arrow.lifetime = 350
  arrowGroup.add(arrow)
}
function createredB() {
  redB = createSprite(-10, Math.round(random(30, 870)), 10, 10)
  redB.addImage(redbImage)
  redB.scale = 0.15
  redB.velocityX = 2
  redB.lifetime = 1900 / 2
  redBGroup.add(redB)
}
function creategreenB() {
  greenB = createSprite(-10, Math.round(random(30, 870)), 10, 10)
  greenB.addImage(greenbImage)
  greenB.scale = 0.15
  greenB.velocityX = 2
  greenB.lifetime = 1900 / 2
  greenBGroup.add(greenB)
}
function createpinkB() {
  pinkB = createSprite(-10, Math.round(random(30, 870)), 10, 10)
  pinkB.addImage(pinkbImage)
  pinkB.scale = 1.5
  pinkB.velocityX = 2
  pinkB.lifetime = 1900 / 2
  pinkBGroup.add(pinkB)
}
function createblueB() {
  blueB = createSprite(-10, Math.round(random(30, 870)), 10, 10)
  blueB.addImage(bluebImage)
  blueB.scale = 0.15
  blueB.velocityX = 2
  blueB.lifetime = 1900 / 2
  blueBGroup.add(blueB)
}
function createBird() {
  bird = createSprite(-10, Math.round(random(30, 870)), 10, 100);
  bird.addAnimation("birdfly", birdImage);
  bird.scale = 0.4
  bird.velocityX = 3
  birdGroup.add(bird)
  bird.lifetime = 1900 / 2
}
function overlaping()
{
  
  arrowGroup.overlap(redBGroup, function (collector, collected) {
    collected.remove()
   // collector.remove()
    score += 1
  })

  arrowGroup.overlap(greenBGroup, function (collector, collected) {
    collected.remove()
  //  collector.remove()
    score += 2
  })

  arrowGroup.overlap(birdGroup, function (collector, collected) {
    collected.remove()
  //  collector.remove()
    score -= 5
  })

  arrowGroup.overlap(blueBGroup, function (collector, collected) {
    collected.remove()
   // collector.remove()
    score += 3
  })

  arrowGroup.overlap(pinkBGroup, function (collector, collected) {
    collected.remove()
  //  collector.remove()
    score += 5
  })
}