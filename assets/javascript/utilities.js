function randomNumber(max, start=0) {
  return Math.floor(Math.random()* max) + start
}


function randomizedArray (arr) {
  var rIndex
  var arrCopy = arr.slice()
  var tmpArr = []
	for (var i = 0; i < arr.length; i++) {
		rIndex = Math.floor(Math.random() * arrCopy.length)
		tmpArr.push(arrCopy.splice(rIndex, 1)[0])
	}
  return tmpArr
}



function letterChecker() {
  
  $opHealth = $('#opponentHealth span');
  $usHealth = $('#userHealth span')
    
        var $numLetters1 = $opHealth.text().split('').length 
        var $numLetters2 = $usHealth.text().split('').length; 
    
        if ($numLetters1 > 2) {
		        $opHealth.css("font-size", "21px");
		    }
		    if ($numLetters2 > 2) {
		    		$usHealth.css("font-size", "21px");
		    }
};