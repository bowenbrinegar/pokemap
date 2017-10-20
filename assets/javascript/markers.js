//Map, Markers, Marker Remove, Marker Action

function createPokeMarkers(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    
    if (results.length >= 3) {
      var results = randomizedArray(results)
      results = results.slice(0, randomNumber(2,1))
    }
    //initial ajax call
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i], randomNumber(150, 1)); 
    }
  };
};

function createMarker(place, num) {
  
  var type = place.types[0];
  var imgString; 
  var image;

  if (['book_store', 'library', 'theater', 'lawyer', 'bank', 'travel_agency', 'food', 'restraunts'].some(function (l) {
    return place.types.indexOf(l) >= 0
  })) {
    imgString = "assets/images/pokeball.png"
    image = new google.maps.MarkerImage(imgString, null, null, null, new google.maps.Size(50,50));
    type = 'pokeball'
  } else if (['gym', 'pharmacy', 'doctor', 'hospital'].some(function (l) {
    return place.types.indexOf(l) >= 0
  })) {
    imgString = "assets/images/berry.png"
    image = new google.maps.MarkerImage(imgString, null, null, null, new google.maps.Size(60,60));
    type = 'berry'
  } else {
    imgString = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + num + ".png"
    image = new google.maps.MarkerImage(imgString, null, null, null, new google.maps.Size(110,110));
  };

  var markerId = place.geometry.location;

  if (!markers.includes('marker_' + markerId)) {
    var marker = new google.maps.Marker({
      position: markerId,
      animation: google.maps.Animation.BOUNCE,
      icon: image,
      map: map,
      id: 'marker_' + markerId,
    });
   marker.num = num;
   marker.type = type;
   marker.id = marker.get('id');
  //pushes new marker to markers array
   markers.push(marker.get('id'))
  //sets markers array to database
   userRef.child("markers").set(markers);
   bindMarkerEvents(marker);
  }
}
//http://jsfiddle.net/fatihacet/CKegk/

function bindMarkerEvents(marker) {
    fetchPoke(marker.num, function (poke) { //replacing with fallback
      this.poke = poke;
  
      google.maps.event.addListener(this, "click", function (success) {
        
        if (marker.type == 'pokeball') {
          collected = this.poke;
          userRef.child("pokemon").push(this.poke)
          renderPokeCard(collected, $('.cardImg'), $('.cardName'), $('.cardHealth'), $('.cardAttack'));
          pokeCollected.style.display = 'block';
        } else if (marker.type == 'berry') {
          berries++;
          userRef.child("berries").set(berries);
        } else {
          if ($pokemoncollection.children().length > 0) {
                $('#catch').empty() //questionable if 
                loadPokemon();
                loadPokemon();
                opponent = this.poke
                renderPokeInBattle(opponent, $('#opponentImg'), $('#opponentName'),
                  $('#opponentHealth'), $('#opponentAttack'));
              } else { 
                collected = this.poke
                renderPokeCard(collected, $('.cardImg'), $('.cardName'), $('.cardHealth'), $('.cardAttack'));
                pokeCollected.style.display = 'block';
                userRef.child('pokemon').push(this.poke)
              }
          $('#pouch').css("display", "block"); 
        }
        this.setMap(null);
      }) 
    }.bind(marker));
};


