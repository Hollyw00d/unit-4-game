$(document).ready(function() {
    // Start game set to false
    var startGame = false;

    var fighting = false;

    var selectedAttacker;
    var selectedDefender;

    var attackerHealthPointsStarting;
    var defenderHealthPointsStarting;

    var attackerHealthPointsCurrent;
    var defenderHealthPointsCurrent;

    var $yourCharacterLinks = $('#your-character a');
    var $attackerLinks = $('#attacker a');
    var $defenderLinks = $('#defender a');
    var $gameStartBtn = $('#game-state-btn > button');
    var $messages = $('#messages');
    var $healthPoints = $('.health-points');
    var $attackBtn = $('#attack-btn > button');
    var $selectedAttackerElem;
    var $selectedAttackerHealthPointsElem;
    var $selectedDefenderElem;
    var $selectedDefenderHealthPointsElem;

    $gameStartBtn.on('click', function() {
        startGame = true;
        if(startGame) {
            $messages.html('Click on a Character');
            $messages.removeClass('d-none');
            $(this).html('Restart Game');
            
        }
    });

    $yourCharacterLinks.on('click', function(e) {
        e.preventDefault();

        if(startGame && !fighting) {

            $messages.html('Click on an Enemy Available to Attack');

            $yourCharacterLinks.addClass('d-none');
            $(this).removeClass('d-none').addClass('active');

            for(var i = 0; i < $attackerLinks.length; i++) {
                if($($attackerLinks[i]).attr('data-char') === $(this).attr('data-char')) {
                    $($attackerLinks[i]).addClass('d-none');
                    var $attackerSelectDataChar = $($attackerLinks[i]).attr('data-char');
                    attackerSelectDataChar = $attackerSelectDataChar;
                    selectedAttacker = $("#attacker a[data-char='" + $attackerSelectDataChar + "']").attr('aria-label');
                    $selectedAttackerElem = $("#your-character a[data-char='" + $attackerSelectDataChar + "']");
                    $selectedAttackerHealthElem = $("#attacker a[data-char='" + $attackerSelectDataChar + "'] ");
                    $selectedAttackerHealthPointsElem = $("#attacker a[data-char='" + $attackerSelectDataChar + "'] .health-points");
                    attackerHealthPointsStarting = $selectedAttackerHealthPointsElem.text();
                }
                else {
                    $($attackerLinks[i]).removeClass('d-none').addClass('active');
                }
            }

            $selectedAttackerHealthPointsElem.html(attackerHealthPointsStarting);
            if(defenderHealthPointsStarting && $selectedDefenderHealthPointsElem) {
                $selectedDefenderHealthPointsElem.html(defenderHealthPointsStarting);
            }
        }
    });

    $attackerLinks.on('click', function(e) {
        e.preventDefault();
        if(startGame && !fighting) {
            $(this).addClass('d-none');

            for(var i = 0; i < $defenderLinks.length; i++) {
                if($($defenderLinks[i]).attr('data-char') === $(this).attr('data-char')) {
                    $($defenderLinks[i]).removeClass('d-none').addClass('active');
                    var $defenderSelectDataChar = $($defenderLinks[i]).attr('data-char');
                    defenderSelectDataChar = $defenderSelectDataChar;
                    selectedDefender = $("#defender a[data-char='" + $defenderSelectDataChar + "']").attr('aria-label');
                    $selectedDefenderElem = $("#defender a[data-char='" + $defenderSelectDataChar + "']");
                    $selectedDefenderHealthPointsElem = $("#defender a[data-char='" + $defenderSelectDataChar + "'] .health-points");
                    defenderHealthPointsStarting = $selectedDefenderHealthPointsElem.text();
                }
            } 

            $messages.html('You have selected ' + selectedAttacker + ' to attack and ' + selectedDefender + ' to defend.<br /><br />Click the Attack button to fight!');
            fighting = true;
        }
    });

    
    $defenderLinks.on('click', function(e) {
        e.preventDefault();
    });
    
    $attackBtn.on('click', function(e) {
        e.preventDefault();

        if(startGame && !fighting || startGame && fighting) {

            fighting = true;

            var randomAttackerValue = (Math.floor(Math.random() * 10) + 1) * 6;
            var randomDefenderValue = (Math.floor(Math.random() * 10) + 1) * 6;

            attackerHealthPointsCurrent = $selectedAttackerElem.find('.health-points').text();
            defenderHealthPointsCurrent = $selectedDefenderElem.find('.health-points').text();

            if(defenderHealthPointsCurrent < 1) {
                $messages.html(selectedAttacker + ' beats ' +  selectedDefender + '!');
                $selectedDefenderElem.addClass('dead');
                fighting = false;
            }
            else if(attackerHealthPointsCurrent < 1) {
                $messages.html(selectedDefender + ' beats ' +  selectedAttacker + '. You lost!');
                fighting = false;
            }
            else {
                if(randomAttackerValue > randomDefenderValue) {
                    defenderHealthPointsCurrent -= randomAttackerValue;
                    $selectedDefenderElem.find($healthPoints).html(defenderHealthPointsCurrent);
                    $messages.html(selectedDefender + ' lost ' +  randomAttackerValue + ' health points!');
                }
                else if(randomAttackerValue < randomDefenderValue) {
                    attackerHealthPointsCurrent -= randomDefenderValue;
                    $selectedAttackerElem.find($healthPoints).html(attackerHealthPointsCurrent);
                    $messages.html(selectedAttacker + ' lost ' +  randomAttackerValue + ' health points!');
                }
                else if(randomAttackerValue === randomDefenderValue) {
                    $messages.html(selectedAttacker + ' and ' + selectedDefender + ' both tied. No one lost health points!');
                }

            }

        }

    });

});
