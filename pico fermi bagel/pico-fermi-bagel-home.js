var guessCount = 0;

var resultsTable = document.getElementById('results');

var guessResult = [];

var PFB = [];

function gameInit(){
  $("#playAgain").hide();
  PFB[0] = Math.floor(Math.random() * 10);
  newGuess = Math.floor(Math.random() * 10);
  while (newGuess == PFB[0]) {
    newGuess = Math.floor(Math.random() * 10);
  }
  PFB[1] = newGuess;
  newGuess = Math.floor(Math.random() * 10);
  while ((newGuess == PFB[0]) || (newGuess == PFB[1])) {
    newGuess = Math.floor(Math.random() * 10);
  }
  PFB[2] = newGuess;
}

gameInit();

function processGuess() {
  event.preventDefault();
  var fermiCount = 0;
  var picoCount = 0;
  var userGuess = document.getElementById('guess').value;
  var guessList = [];
  validGuess = /(^|\D)\d{3}(\D|$)/;
  guessResult[guessCount] = "";
  if (!validGuess.test(userGuess)) {
    alert("Invalid guess! Please enter 3 digits 0-9");
  }
  else if (userGuess[0] == userGuess[1] || userGuess[0] == userGuess[2] ||
    userGuess[1] == userGuess[2]){
      alert("Invalid guess! You may not repeat digits.");
    }
  else {
    for (i=0;i<3;i++){
      if (userGuess[i] == PFB[i]){
        fermiCount++;
      }
      else if (userGuess.indexOf(PFB[i]) != -1){
        picoCount++
      }
    }
    if (fermiCount == 0 && picoCount == 0){
      guessResult[guessCount] = "Bagels<br>";
    }
    else {
      guessResult[guessCount] = 'Fermi '.repeat(fermiCount) + 'Pico '.repeat(picoCount);
    }
    guessList[guessCount] = userGuess;
    /* guessResult[guessCount] = userGuess + "  " + guessResult[guessCount];  */
    var newRow   = resultsTable.insertRow(0);
    var turnCount = guessCount + 1;
    newRow.innerHTML = "<td>" + turnCount + "</td><td>" + guessList[guessCount] + "</td><td>" + guessResult[guessCount] + "</td>";

    document.getElementById('guess').value = "";
    if (fermiCount == 3){
      document.getElementById('guessResult').innerHTML = "<h3>You won in " + turnCount + " turns!</h3>";
    }
    else if (guessCount == 19){
      document.getElementById('guessResult').innerHTML = "<h3>You lost in 20 turns.<h3>";
    }
    guessCount++;
    if (fermiCount == 3 || guessCount == 20){
      $("#playAgain").show();
      document.getElementById('submit').disabled = true;
    }
}
}

$('#guessform').submit(function() {

  event.preventDefault();
  processGuess();

});

$('#submit').on('click', function() {

  event.preventDefault();
  processGuess();

});

$('#playAgain').on('click', function() {
  event.preventDefault();
  guessCount = 0;
  resultsTable.innerHTML = "";
  document.getElementById('submit').disabled = false;
  document.getElementById('guessResult').innerHTML = "";
  gameInit();
});
