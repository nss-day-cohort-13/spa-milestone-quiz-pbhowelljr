//**********//BORDER//**********//
var carLot = (function(object) {
	
	//DECLARE DOM ELEMENT VARIABLES//
	var cards = document.getElementsByClassName("cards");

	//OBJECT METHOD THAT CHANGES BORDER WIDTH AND BACKGROUND COLOR OF A SELECTED CARD//
	object.changeSelected = function(index, borderColor) {
		carLot.setCarsArray(carLot.getCarsArray());
		cards[index].setAttribute(`style`, `border: 6px solid ${borderColor}`);
		cards[index].setAttribute(`id`, `selectedCard`);
	};

	//RETURNS OBJECT WITH NEW METHODS ATTACHED//	
	return object;	

//INVOKES FUNCTION WITH EMPTY OBJECT IF CAR LOT HAS NOT YET INITIALIZED//
})(carLot || {});
