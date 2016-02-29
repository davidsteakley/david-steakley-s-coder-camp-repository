var guessCount = 0;

var guessList = [];

/* get pointer to the table in which guess results will be displayed */

var resultsTable = document.getElementById('results');

var guessResult = [];

var PFB = [];

function gameInit(){
  /* at startup, hide the "play again" button, til the game ends */
  $("#playAgain").hide();
  /* set up the number to be guessed */
  PFB[0] = Math.floor(Math.random() * 10);
  for (i=1;i<3;i++){
    newGuess = Math.floor(Math.random() * 10);
    /* check to make sure the random numnber isn't the same any of the other
       numbers as the rule is, all three digits must be unique */
    while (PFB.indexOf(newGuess) != -1) {
      newGuess = Math.floor(Math.random() * 10);
    }
    PFB[i] = newGuess;
  }
}

gameInit();

function processGuess() {
  /* counts the number of "fermi" and "pico" results for the current guess */
  var fermiCount = 0;
  var picoCount = 0;
  /* grab the user's guess */
  var userGuess = document.getElementById('guess').value;
  guessList = [];
  /* validate that the user's guess is exactly 3 numeric digits */
  validGuess = /(^|\D)\d{3}(\D|$)/;
  guessResult[guessCount] = "";
  if (!validGuess.test(userGuess)) {
    alert("Invalid guess! Please enter 3 digits 0-9");
  }
  /* validate that all the digits in the user's guess are unique */
  else if (userGuess[0] == userGuess[1] || userGuess[0] == userGuess[2] ||
    userGuess[1] == userGuess[2]){
      alert("Invalid guess! You may not repeat digits.");
    }
  /* if no validation errors, process with scoring the user's guess */
  else {
    for (i=0;i<3;i++){
      if (userGuess[i] == PFB[i]){
        /* check for "fermi", where the user has a digit that is right, and in the right place */
        fermiCount++;
      }
      else if (userGuess.indexOf(PFB[i]) != -1){
        /* check for a "pico", where the user has a digit that is right but not in the
           right place */
        picoCount++
      }
    }
    if (fermiCount == 0 && picoCount == 0){
      /* if the user has no fermis and no picos, it is scored bagels */
      guessResult[guessCount] = "Bagels";
    }
    else {
      /* load the guess results table with the results for this guess */
      guessResult[guessCount] = 'Fermi '.repeat(fermiCount) + 'Pico '.repeat(picoCount);
    }
    /* record the user's guess */
    guessList[guessCount] = userGuess;
    /* add a row to the results HTML table, at the top of the table */
    var newRow   = resultsTable.insertRow(0);
    /* increment turncourt in a temp variable - to display the turn # in the table */
    var turnCount = guessCount + 1;
    /* load the HTML with the scoring results for this guess */
    newRow.innerHTML = "<td>" + turnCount + "</td><td>" + guessList[guessCount] + "</td><td>" + guessResult[guessCount] + "</td>";
    /* reset the user guess field to blanks */
    document.getElementById('guess').value = "";
    /* if the user got three fermis, the game is over, we have a winner */
    if (fermiCount == 3){
      document.getElementById('guessResult').innerHTML = "<h3>You won in " + turnCount + " turns!</h3>";
    }
    /* if the turncount is 19, the user has had 20 turns, the game is over, we have a loser */
    else if (guessCount == 19){
      document.getElementById('guessResult').innerHTML = "<h3>You lost in 20 turns.<h3>";
    }
    guessCount++;
    if (fermiCount == 3 || guessCount == 20){
      /* when the game is over, show the "play again" button and deactivate the guess button */
      $("#playAgain").show();
      document.getElementById('submit').disabled = true;
    }
}
}

$('#guessform').submit(function(e) {
  /* same function, for pressing enter in the guess field, or clicking the submit
     button */

  e.preventDefault();
  processGuess();

});

$('#submit').on('click', function(e) {
  /* same function, for pressing enter in the guess field, or clicking the submit
     button */

  e.preventDefault();
  processGuess();

});

$('#playAgain').on('click', function(e) {
  /* play again button restarts the game */
  e.preventDefault();
  guessCount = 0;
  resultsTable.innerHTML = "";
  document.getElementById('submit').disabled = false;
  document.getElementById('guessResult').innerHTML = "";
  gameInit();
});
