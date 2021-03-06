

//Firebase API

var config = {
    apiKey: "AIzaSyDH1QU3JbnLa7kJBeaDy6iBZWyCANneEF8",
    authDomain: "pokemon-g-6760b.firebaseapp.com",
    databaseURL: "https://pokemon-g-6760b.firebaseio.com",
    projectId: "pokemon-g-6760b",
    storageBucket: "pokemon-g-6760b.appspot.com",
    messagingSenderId: "712269966690"
  };

firebase.initializeApp(config);

var database = firebase.database();
var userId;


//ajax

function fetchAjax(num) {
  num = num || Math.floor(Math.random() * 150) + 1;
  return $.ajax({
      url: "https://pokeapi.co/api/v2/pokemon/" + num + '/',
      dataType: 'json',
      method: 'GET'
  });
}

function fetchPoke(num, callback) {
  num = num || Math.floor(Math.random() * 150) + 1;
  var poke
  var basePokeRef = database.ref().child("Base")
  basePokeRef.orderByChild("num").equalTo(num).once("value", function(snapshot) {
    var val = snapshot.val()
    if (val) {
      snapshot.forEach(function (childSnapshot) {
        poke = getPokeValuesFromDB(childSnapshot)
        callback(poke)
      })
    } else { 
      fetchAjax(num).done( function (response) {
        poke = getPokeValues(response)
        basePokeRef.push(poke)
        callback(poke) 
      })
    }
  })
  // try to get pokemon from database
  // fall back to fetchAjax.done on error, 
    // add to database in that case
}

//isotope

var $pokemoncollection = $('#pokemonCollection');

$pokemoncollection.isotope({
  itemselector: '.pokemon',
  layoutMode: 'fitRows',
  stagger: 30,
  getSortData: {
    attack: '[data-attack]',
    name: '[data-name]',
    hp: function ( elem ) {
        return parseInt($(elem).attr('data-hp'))
      },
    attack: function ( elem ) {
        return parseInt($(elem).attr('data-attack'))
      }
  },
  sortBy: 'hp'
});


//isotope controls

$('#pouchControls .sortby.attack').on('click', function () {
  selector = 'attack';
  $pokemoncollection
    .children()
    .each(function (i, poke) { decoratePouchHover($(poke)) })
  $pokemoncollection.isotope({sortBy : 'attack', sortAscending: false})
})
$('#pouchControls .sortby.name').on('click', function () {
  selector = 'name';
  $pokemoncollection
    .children()
    .each(function (i, poke) { decoratePouchHover($(poke)) })
  $pokemoncollection.isotope({sortBy : 'name', sortAscending: true})
})
$('#pouchControls .sortby.hp').on('click', function () {
  selector = 'health';
  $pokemoncollection
    .children()
    .each(function (i, poke) { decoratePouchHover($(poke)) })
  $pokemoncollection.isotope({sortBy : 'hp', sortAscending: false})
})
$('#pouchControls .sortby.type').on('click', function () {
  selector = 'type';
  $pokemoncollection
    .children()
    .each(function (i, poke) { decoratePouchHover($(poke)) })
  $pokemoncollection.isotope({sortBy : 'type', sortAscending: true})
})



//on click open and close pouch

$('#pouchButton').on("click", function() {
  loadPokemon();
  loadPokemon();
  $('#pouch').css("display", "block");
  
  if (battle == true) {
    $('#battleMode').css("display", "none");
  }
  hideButtons();
});

$('#closePouch').on("click", function() {
  $('#pouch').css("display", "none");
  if (battle == true) {
    $('#battleMode').css("display", "block");
    showButtons();
  }
});

$('#closeBattle').on("click", function() {
  $('#battleMode').css("display", "none");
  hideButtons();
});

//on click open and close modals

$('#infoButton').on('click', function(){
  infoModal.style.display = 'block';

});

$('#modalBox').on("click", "span", function(){
  infoModal.style.display = 'none';
  loginFailure.style.display = 'none';
  loginSuccess.style.display = 'none';
  pokeCollected.style.display = 'none';
  pokeLost.style.display = 'none';
  pokeMissed.style.display = 'none';
});

window.onclick = function(event){
  if (event.target == infoModal)  {
    infoModal.style.display = 'none';
  } else {
    loginFailure.style.display = 'none';
    loginSuccess.style.display = 'none';
  }
};


//berries
function hideButtons() {
  $('#attackButton').hide(); 
  $('#catchButton').hide(); 
  $('#berriesButton').hide(); 
}

hideButtons();

function showButtons() {
  $('#attackButton').show(); 
  $('#catchButton').show(); 
  if (berries == 0) {
      $('#berriesButton').hide();
    } else {
      $('#berriesButton').show();
    }
}

$('#pouchButton').hide();



