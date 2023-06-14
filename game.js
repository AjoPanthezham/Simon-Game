var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    

//1. Use jQuery to select the button with the same id as the randomChosenColour
//2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.

     animatePress(randomChosenColor);

//3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
      
     playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
}

function animatePress(currentColor){
    $("#"+ currentColor).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+ currentColor).addClass(".pressed").delay (100).removeClass(".pressed");
}

function checkAnswer(currentLevel){
 if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

  console.log("success");

  //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
  if (userClickedPattern.length === gamePattern.length){

    //5. Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function () {
      nextSequence();
    }, 1000);

  }

} else {

  console.log("wrong");
  playSound("wrong");
  //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
  $("#level-title").text("Game Over, Press Any Key to Restart");

  //2. Call startOver() if the user gets the sequence wrong.
  startOver();
}
}

//1. Create a new function called startOver().
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}

