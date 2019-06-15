$(document).ready(function() {
    // Start game set to false
    var startGame = false;

    $('#game-state-btn > button').on('click', function() {
        startGame = true;
    });

    $('').on('click', function(e) {
        e.preventDefault();
    });

});
