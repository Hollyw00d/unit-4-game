$(document).ready(function() {
    // Start game set to false
    var startGame = false;

    var attackBegun = false;
    var selectedAttacker;
    var selectedDefender;

    var healthPointsObiWanKenobi = 120;
    var healthPointsLukeSkywalker = 100;
    var healthPointsDarthSidious = 150;
    var healthPointsDarthMaul = 180;

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
    var $healthPoints = $('.health-points');

    $gameStartBtn.on('click', function() {
        startGame = true;
        if(startGame) {
            $messages.text('Click on a Character');
            $messages.removeClass('d-none');
            $(this).text('Restart Game');
        }
    });

    $yourCharacterLinks.on('click', function(e) {
        e.preventDefault();

        if(startGame && !attackBegun) {

            attackBegun = true;

            $messages.text('Click on an Enemy Available to Attack');

            $yourCharacterLinks.addClass('d-none');
            $(this).removeClass('d-none').addClass('active');

            for(var i = 0; i < $attackerLinks.length; i++) {
                if($($attackerLinks[i]).attr('data-char') === $(this).attr('data-char')) {
                    $($attackerLinks[i]).addClass('d-none');
                    var $attackerSelectDataChar = $($attackerLinks[i]).attr('data-char');
                    selectedAttacker = $("#attacker a[data-char='" + $attackerSelectDataChar + "']").attr('aria-label');
                }
                else {
                    $($attackerLinks[i]).removeClass('d-none').addClass('active');
                }
            }
        }
    });

    $attackerLinks.on('click', function(e) {
        e.preventDefault();
        if(startGame && !$defenderLinks.hasClass('active')) {
            $(this).addClass('d-none');

            for(var i = 0; i < $defenderLinks.length; i++) {
                if($($defenderLinks[i]).attr('data-char') === $(this).attr('data-char')) {
                    $($defenderLinks[i]).removeClass('d-none').addClass('active');
                    
                }
                else {
                    $($defenderLinks[i]).addClass('d-none');
                }
            }  
            
        }
    });

    $defenderLinks.on('click', function(e) {
        e.preventDefault();
    });


});
