$(document).ready(function() {
    // Start game set to false
    var startGame = false;

    var $yourCharacterLinks = $('#your-character a');
    var $attackerLinks = $('#attacker a');

    var $messages = $('#messages');

    $('#game-state-btn > button').on('click', function() {
        startGame = true;
        $messages.removeClass('d-none');
        $(this).text('Restart Game');
    });

    $yourCharacterLinks.on('click', function(e) {
        e.preventDefault();

        if(startGame) {
            $yourCharacterLinks.addClass('d-none');
            $(this).removeClass('d-none');
            
            console.log($(this).attr('data-char'));

            for(var i = 0; i < $attackerLinks.length; i++) {
                if($($attackerLinks[i]).attr('data-char') === $(this).attr('data-char')) {
                    $($attackerLinks[i]).addClass('d-none');
                }
                else {
                    $($attackerLinks[i]).removeClass('d-none');
                }
            }
        }
    });

});
