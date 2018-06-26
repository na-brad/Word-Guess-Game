var lettersOnly = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var tvShows = ["bojack horseman", "stranger things", "orange is the new black", "master of none", "daredevil", "fuller house", "narcos", "bloodline", "house of cards", "the punisher", "altered carbon", "grace and frankie", "cooked", "black mirror", "jessica jones"];
var score = 0;
var imgArr = ["assets/images/0.jpg", "assets/images/1.jpg", "assets/images/2.jpg", "assets/images/3.jpg", "assets/images/4.jpg", "assets/images/5.jpg", "assets/images/6.png"];


start();
function start() {
    var guessMe = "";
    var guessedLetters = "";
    var selected = tvShows[Math.floor(Math.random() * tvShows.length)].toUpperCase();
    var livesRemaining = 6;
    document.getElementById("hangman").src = imgArr[livesRemaining];
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("reset").style.display = "none";
    document.querySelector("#score").innerHTML = "# of Wins: " + score;


    function convert() {
        for (i = 0; i < selected.length; i++) {
            if (selected.charAt(i) != " ") {
                guessMe += "_";
            }
            else if (selected.charAt(i) == " ") {
                guessMe += " ";
            }
        }
    }
    convert();
    document.querySelector("#underscore").innerHTML = guessMe;
    document.querySelector("#guesses").innerHTML = guessedLetters;
    document.querySelector("#lives").innerHTML = "Chances remaining: " + livesRemaining;

    String.prototype.replaceAt = function (replacement, index) {

        return this.substr(0, index) + replacement + this.substr(index + 1);
    }
    document.onkeyup = function (play) {
        var key = event.key.toUpperCase();
        var keyString = String(key);
        console.log(key);
        console.log(selected.indexOf(keyString));
        for (j = 0; j < selected.length; j++) {
            if (selected.indexOf(key, j) == j) {
                guessMe = guessMe.replaceAt(key, j);
                document.querySelector("#underscore").innerHTML = guessMe;

            }


        }
        if (selected.indexOf(key) == -1 && lettersOnly.indexOf(key) != -1 && guessedLetters.indexOf(key) == -1) {
            guessedLetters = guessedLetters + keyString + " ";
            livesRemaining--;
            if (livesRemaining < 0) {
                livesRemaining = 0;
            }
            document.querySelector("#guesses").innerHTML = guessedLetters;
            document.querySelector("#lives").innerHTML = "Chances remaining: " + livesRemaining;

        }
        console.log(guessedLetters.length);
        if (guessedLetters.length >= 12) {
            document.getElementById("gameOver").style.display = "inline";
            document.getElementById("reset").style.display = "inline";
            document.querySelector("#underscore").innerHTML = selected;


        }
        if (guessMe == selected) {
            score++;
            livesRemaining = 6;
            start();
        }
        document.getElementById("hangman").src = imgArr[livesRemaining];
    }

}
document.getElementById("reset").onclick = function () {
    location.reload();
}