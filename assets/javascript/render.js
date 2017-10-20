function getPokeValues(response) {
  res = {
    attack: response.stats[4].base_stat,
    hp: response.stats[5].base_stat,
    image: response.sprites.front_default,
    name: response.name,
    type: response.types[0].type.name,
    num: response.id
  }
  initPokeBattleValues(res)
  return res
} //will decide what data gets saved

function getPokeValuesFromDB(snapshot) {
  res = snapshot.val()
  res.key = snapshot.key
  initPokeBattleValues(res)
  return res
}

function initPokeBattleValues (pokeObj) {
  pokeObj.health = pokeObj.hp
  if (pokeObj.attack > 10) {
    pokeObj.atk = Math.floor(pokeObj.attack / 7)
  } else {
    pokeObj.atk = pokeObj.attack;
  }
}


function addPokeToVariables(response) {
  var poke = getPokeValues(response) 
  pokeName = poke.name;
  pokeHealth = poke.hp;
  pokeImage = poke.image;
  pokeAttack = poke.attack;
  pokeType = poke.type;
}

function renderPokeInBattle (pokeObj, $targetImg, $targetName, $targetHealth, $targetAttack) {
  $targetImg.empty();
  $targetName.empty();
  $targetHealth.empty();
  $targetAttack.empty();

  var nameEntry;
  var healthIcon;
  
  if (pokeObj == user) {
    nameEntry = $("<span class='vertical-text-2'>").text(pokeObj.name);
    healthIcon = $("<img class='heart'>").attr("src", 'assets/images/hp.png').attr("id", "userHeart");
  };
  if (pokeObj == opponent) {
    nameEntry = $("<span class='vertical-text-1'>").text(pokeObj.name);
    healthIcon = $("<img class='heart'>").attr("src", 'assets/images/hp.png').attr("id", "opponentHeart");
  };

  var healthEntry = $('<span>').text(pokeObj.health);
  var attackEntry = $('<span>').text(pokeObj.atk);
  var imageEntry = $("<img class='pokeImg'>").attr("src", pokeObj.image);
  
 
  var atkIcon = $("<img class='atk'>").attr("src", 'assets/images/atk.png')

  $targetImg.append(imageEntry);
  $targetName.append(nameEntry);
  $targetHealth.append(healthEntry, healthIcon);
  $targetAttack.append(attackEntry, atkIcon);

  letterChecker();
}

function renderPokeCard (pokeObj, $targetImg, $targetName, $targetHealth, $targetAttack) {
  $targetImg.empty();
  $targetName.empty();
  $targetHealth.empty();
  $targetAttack.empty();

  var nameEntry = $("<span>").text(pokeObj.name);
  var healthEntry = $('<span>').text(pokeObj.health);
  var attackEntry = $('<span>').text(pokeObj.atk);
  var imageEntry = $("<img class='pokeCardImg'>").attr("src", pokeObj.image);
  
  $targetImg.append(imageEntry);
  $targetName.append(nameEntry);
  $targetHealth.append(healthEntry);
  $targetAttack.append(attackEntry);
}


function renderPokeInPouch (pokeObj) {
  var image = $("<img class='poke'>").attr("src", pokeObj.image);
  var name = $("<h4 class='hoverName'>").append(pokeObj.name);
  var dataObj= $("<h4 class='hoverHealth'>").append(pokeObj.hp)
  var button = $("<button class='button__description' data-id='" + pokeObj.key + "'>")
    .append(name, dataObj);
  var div = $("<div class='button__wrap'>")
    .attr('data-name', pokeObj.name)
    .attr('data-attack', pokeObj.atk)
    .attr('data-hp', pokeObj.hp)
    .attr('data-type', pokeObj.type)
    .attr('data-id', pokeObj.key)
    .addClass("pokemon")
    .append(image, button);
  return div
}

function decoratePouchHover ($pouchPoke) {
  var dataShown;
    if (selector == 'health' || 'name') {
      dataShown = 'HP: ' + $pouchPoke.attr('data-hp')
    }
    if (selector == 'attack') {
      dataShown = 'ATK: ' + $pouchPoke.attr('data-attack')
    }
    if (selector == 'type') {
      dataShown = $pouchPoke.attr('data-type')
    }
    $pouchPoke.find('.hoverHealth').text(dataShown)
}


$('#pokemonCollection').on("click", "button", function() {
  // fetchAjax().done(addPokeToVariables);
  $('#user').empty();
  $('#pouch').css("display", "none");

//loads the pokemon from the pokemonCollection into the user side of battlemode
//loads specific data into battlemode
//important


  referenceId = $(this).attr("data-id");

  var ref = userRef.child("pokemon").child(referenceId);

  ref.once("value").then(function(snapshot) {
    user = getPokeValuesFromDB(snapshot);
    renderPokeInBattle(user, $('#userImg'), $('#userName'),
     $('#userHealth'), $('#userAttack')); 
  });
  
  if (battle == true) {
    battleMode();
  };

//loads specific data into battlemode
//important

  if (opponent) {
    $('#catch').empty();
    renderPokeInBattle(opponent, $('#opponentImg'), $('#opponentName'),
     $('#opponentHealth'), $('#opponentAttack'));
    battleMode();
  }
})

function loadPokemon() {
    $pokemoncollection.isotope('layout')
    $('#pouch').css("display", "block");
}