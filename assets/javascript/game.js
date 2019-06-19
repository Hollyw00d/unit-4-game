$(document).ready(function() {
    // startGame set to false
    var startGame = false;
    // fighting set to false
    var fighting = false;

    // Set selectedAttacker and 
    // selectedDefender to strings of who atacker and defender are
    var selectedAttacker;
    var selectedDefender;

    // Use this variable to reset all character's
    // points to their health point original values
    var defenderHealthPointsStarting;

    // Keep track of current attacker and defender health points
    var attackerHealthPointsCurrent;
    var defenderHealthPointsCurrent;

    // Select elements
    var $yourCharacterLinks = $('#your-character a');
    var $attackerLinks = $('#attacker a');
    var $defenderLinks = $('#defender a');
    var $gameStartBtn = $('#game-state-btn > button');
    var $messages = $('#messages');
    var $healthPoints = $('.health-points');
    var $attackBtn = $('#attack-btn > button');
    var $selectedAttackerElem = '';
    var $selectedDefenderElem = '';
    var $selectedDefenderHealthPointsElem = '';
    var $selectedAttackerHealthElem = '';

    // Reset health points
    function resetHealthPoints() {
        // If selected attacker elem and selected defender elem
        // does not equal empty string
        if($selectedAttackerElem !== '' && $selectedDefenderElem !== '') {
            // Do switch statement to select attackers by
            // data-char attribute in anchor tag
            switch($selectedAttackerHealthElem.attr('data-char')) {
                case 'obiWanKenobi':
                    attackerHealthPointsStarting = 120;
                    $selectedAttackerHealthElem.find('.health-points').text(120);
                    break;
                case 'lukeSkywalker':
                    attackerHealthPointsStarting = 100;
                    $selectedAttackerHealthElem.find('.health-points').text(100);
                    break;
                case 'darthSidious':
                    attackerHealthPointsStarting = 150;
                    $selectedAttackerHealthElem.find('.health-points').text(150);                    
                    break;
                case 'darthMaul':
                    attackerHealthPointsStarting = 180;
                    $selectedAttackerHealthElem.find('.health-points').text(180);                                           
                    break;            
            }

            // Do switch statement to select defenders by
            // data-char attribute in anchor tag
            switch($selectedDefenderElem.attr('data-char')) {
                case 'obiWanKenobi':
                    defenderHealthPointsStarting = 120;
                    $selectedDefenderElem.find('.health-points').text(defenderHealthPointsStarting);
                    break;
                case 'lukeSkywalker':
                    defenderHealthPointsStarting = 100;
                    $selectedDefenderElem.find('.health-points').text(defenderHealthPointsStarting);
                    break;
                case 'darthSidious':
                    defenderHealthPointsStarting = 150;
                    $selectedDefenderElem.find('.health-points').text(defenderHealthPointsStarting);   
                    break;
                case 'darthMaul':
                    defenderHealthPointsStarting = 180;
                    $selectedDefenderElem.find('.health-points').text(defenderHealthPointsStarting);  
                    break;                  
            }

        }
  
    }
    // Reset buttons and text, but NOT health points
    function resetButtonsAndText() {
        $gameStartBtn.parent('#game-state-btn').removeClass('active');
        $gameStartBtn.html('Start Game');
        $messages.html('Game Started').addClass('d-none');
        $attackBtn.addClass('d-none');

        $yourCharacterLinks.removeClass('d-none');
        $attackerLinks.removeClass('active').addClass('d-none');
        $defenderLinks.removeClass('active').addClass('d-none');

        startGame = true;
        fighting = false;
    }

 

    // Start game button
    $gameStartBtn.on('click', function() {      
        if(!startGame) {
            resetButtonsAndText();
            resetHealthPoints();
        }
        else if(startGame && $gameStartBtn.parent('#game-state-btn').hasClass('active')) {
            resetButtonsAndText();
            resetHealthPoints();
        }

    });

    // Link to click on to choose a character to attack
    $yourCharacterLinks.on('click', function(e) {
        e.preventDefault();

        if(startGame && !fighting) {
            $gameStartBtn.html('Restart Game');
            $gameStartBtn.parent('#game-state-btn').addClass('active');

            $messages.removeClass('d-none');

            $messages.html('Click on an Enemy Available to Attack');

            $yourCharacterLinks.addClass('d-none');
            $(this).removeClass('d-none').addClass('active');

            // Choose selected attacker and show that attacker
            // and make all other attackers hidden
            for(var i = 0; i < $attackerLinks.length; i++) {
                if($($attackerLinks[i]).attr('data-char') === $(this).attr('data-char')) {
                    $($attackerLinks[i]).addClass('d-none');
                    var $attackerSelectDataChar = $($attackerLinks[i]).attr('data-char');
                    attackerSelectDataChar = $attackerSelectDataChar;
                    selectedAttacker = $("#attacker a[data-char='" + $attackerSelectDataChar + "']").attr('aria-label');
                    $selectedAttackerElem = $("#your-character a[data-char='" + $attackerSelectDataChar + "']");
                    $selectedAttackerHealthElem = $("#your-character a[data-char='" + $attackerSelectDataChar + "'] ");
                    $selectedAttackerHealthPointsElem = $("#your-character a[data-char='" + $attackerSelectDataChar + "']").find('.health-points');
                }
                else {
                    $($attackerLinks[i]).removeClass('d-none').addClass('active');
                }
            }

        }
    });

    // Click on a character to defend
    $attackerLinks.on('click', function(e) {
        e.preventDefault();

        if(startGame && !fighting) {
            // Always reset health points
            resetHealthPoints();

            $(this).addClass('d-none');

            $attackBtn.parent('#attack-btn').removeAttr('class');
            $attackBtn.removeClass('d-none');

            // Select a defender
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

    // Use e.preventDefault(); to prevent default behavior
    // on defender links
    $defenderLinks.on('click', function(e) {
        e.preventDefault();
    });
    
    // Attack button
    $attackBtn.on('click', function(e) {
        e.preventDefault();
        
        if(startGame) {

            fighting = true;

            // Set randomAttackerValue and randomDefenderValue to 6 through 60
            var randomAttackerValue = (Math.floor(Math.random() * 10) + 1) * 6;
            var randomDefenderValue = (Math.floor(Math.random() * 10) + 1) * 6;

            // Get current attacker health points
            // and defender health points
            attackerHealthPointsCurrent = $selectedAttackerElem.find('.health-points').text();
            defenderHealthPointsCurrent = $selectedDefenderElem.find('.health-points').text();

            // If attacker wins
            if(defenderHealthPointsCurrent < 1) {
                $messages.html(selectedAttacker + ' beats ' +  selectedDefender + '!');
                $selectedDefenderElem.addClass('dead');
                fighting = false;
                startGame = true;
                $attackBtn.parent('#attack-btn').attr('class', 'd-none');
                resetHealthPoints();
            }
            // Else if defender wins
            else if(attackerHealthPointsCurrent < 1) {
                $messages.html(selectedDefender + ' beats ' +  selectedAttacker + '. You lost!');
                fighting = false;
                startGame = false;
                $attackBtn.parent('#attack-btn').attr('class', 'd-none');
            }
            // Else record attacker and defender points
            // and take away points as needed.
            // For ties don't take away any points on both sides
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