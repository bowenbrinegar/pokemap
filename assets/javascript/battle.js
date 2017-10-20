function battleMode() { 
  battle = true;
  $('#attackButton').show(); 
  $('#catchButton').show(); 
  showButtons();


  $('#battleMode').css("display", "block");
      battleTheme.play();


  $('#attackButton').unbind().click(function() {
      pikachu.play();

      user.health = user.health - opponent.atk;
      opponent.health = opponent.health - user.atk;

      if (opponent.health < 0) {
        opponent.health = 0
      }
      if (user.health < 0) {
        user.health = 0
      }

      renderPokeInBattle(opponent, $('#opponentImg'), $('#opponentName'),
        $('#opponentHealth'), $('#opponentAttack'));

      renderPokeInBattle(user, $('#userImg'), $('#userName'),
        $('#userHealth'), $('#userAttack')); 

      if (user.health === 0) {
        renderPokeCard(user, $('.cardImg'), $('.cardName'), $('.cardHealth'), $('.cardAttack'));
        pokeLost.style.display = 'block';
        userRef.child("pokemon").child(user.key).remove();
        $('#battleMode').css("display", "none");
        opponent = false
        $('#user').empty()
        hideButtons();
        battle = !battle;
      };

      if (opponent.health === 0) {
        renderPokeCard(opponent, $('.cardImg'), $('.cardName'), $('.cardHealth'), $('.cardAttack'));
        pokeMissed.style.display = 'block';
        $('#battleMode').css("display", "none");
        opponent = false
        $('#catch').empty()
        hideButtons();
        battle = !battle;
      };
  });

  $('#catchButton').unbind().click(function() {
    if (opponent.health < 10 && opponent.health > 0) {
      renderPokeCard(opponent, $('.cardImg'), $('.cardName'), $('.cardHealth'), $('.cardAttack'));
      pokeCollected.style.display = 'block';
      catched.play();
      userRef.child("pokemon").push(opponent);
      $('#battleMode').css("display", "none");
      opponent = false
      hideButtons();
      battle = !battle;
    };
  });

  $('#berriesButton').unbind().click(function() {
    if (berries > 0) {
      berries--;
      userRef.child("berries").set(berries);
      user.health = user.health + 5;
      renderPokeInBattle(user, $('#userImg'), $('#userName'),
        $('#userHealth'), $('#userAttack')); 
    } else {
      $('#berriesButton').hide()
    }
  }) 
}


