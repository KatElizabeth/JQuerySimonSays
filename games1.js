let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let startedGame = false;
let level = 0;

// listen for keypress, start game on keypress
$(document).keypress(function () {
    if(!startedGame) {
        $("h1").text("Level " + level);
        nextSequence();
        startedGame = true;
    }
})

// log user's clicks as pattern for game
$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

})

function nextSequence() {

    // empty pattern to begin again
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);

}

// plays specified sound for each button
function playSound(name) {
    var mySound = new Audio("sounds/" + name + ".mp3");
    mySound.play();
}

// animates each pressed button
function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// checks pressed button with gamePattern, if incorrect, game will reset. Otherwise nextSequence starts.
function checkAnswer(indexPos) {

    if(gamePattern[indexPos] === userClickedPattern[indexPos]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();

            }, 1000);
        }
    } else {

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key To Restart.");
        newGame();
    }
}

// resets variables for new game.
function newGame() {

    level = 0;
    gamePattern = [];
    startedGame = false;

}