
//**********//BORDER//**********//
var carLot = (function(object) {
	
	var cards = document.getElementsByClassName("cards");

	object.changeSelected = function(index, borderColor) {
		carLot.setCarsArray(carLot.getCarsArray());
		cards[index].setAttribute(`style`, `border: 6px solid ${borderColor}`);
		cards[index].setAttribute(`id`, `selectedCard`);
	};

	//RETURNS OBJECT WITH NEW METHODS ATTACHED//	
	return object;	

//INVOKES FUNCTION WITH EMPTY OBJECT IF CAR LOT HAS NOT YET INITIALIZED//
})(carLot || {});
