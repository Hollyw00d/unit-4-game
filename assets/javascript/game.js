$(document).ready(function() {
    // Start game set to false
    var startGame = false;

    var healthPointsObiWanKenobi;
    var healthPointsLukeSkywalker;
    var healthPointsDarthSidious;
    var healthPointsDarthMaul;

    var attackPowerObiWanKenobi;
    var attackPowerLukeSkywalker;
    var attackPowerDarthSidious;
    var attackPowerDarthMaul;

    var counterAttackPowerObiWanKenobi;
    var counterAttackPowerLukeSkywalker;
    var counterAttackPowerDarthSidious;
    var counterAttackPowerDarthMaul;

    var $yourCharacterLinks = $('#your-character a');
    var $attackerLinks = $('#attacker a');
    var $defenderLinks = $('#defender a');
    var $gameStartBtn = $('#game-state-btn > button');
    var $messages = $('#messages');

    $gameStartBtn.on('click', function() {
        startGame = true;
        $messages.removeClass('d-none');
        $(this).text('Restart Game');
    });

    $yourCharacterLinks.on('click', function(e) {
        e.preventDefault();

        if(startGame) {
            $yourCharacterLinks.addClass('d-none');
            $(this).removeClass('d-none');

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

    $attackerLinks.on('click', function(e) {
        e.preventDefault();
        if(startGame) {
            $(this).addClass('d-none');

            for(var i = 0; i < $defenderLinks.length; i++) {
                if($($defenderLinks[i]).attr('data-char') === $(this).attr('data-char')) {
                    $($defenderLinks[i]).removeClass('d-none');
                }
                else {
                    $($defenderLinks[i]).addClass('d-none');
                }
            }            
        }
    });



});
