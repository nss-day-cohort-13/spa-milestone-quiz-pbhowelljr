
//**********//EVENT HANDLERS//**********//
var carLot = (function(object) {

	var cards = document.getElementsByClassName("cards");
	var textInput = document.getElementById("textInput");
	var submitButton = document.getElementById("submitButton");

	//CLONES TARGET ELEMENT AND REPLACES OLD WITH NEW IN THE DOM//
	var cloneNode = function(oldElem) {
		var newElem = oldElem.cloneNode(true);
		oldElem.parentNode.replaceChild(newElem, oldElem);
	};

	object.activateEvents = function() {
		
		var addCardsEventListenersCallback = function(event) {
			var index = event.currentTarget.getAttribute("index");
			var borderStyle = event.currentTarget.getAttribute("style");
			var borderColor = borderStyle.slice(borderStyle.lastIndexOf(' '));
			carLot.changeSelected(index, borderColor);
			addTextInputEventListener(index);
			addSubmitButtonEventListener();
		};

		var addTextInputkEventListenerCallback =  function(event, index) {
				var description = cards[index].querySelector(".description");
				description.innerHTML = textInput.value;
				carLot.getCarsArray()[index].description = textInput.value;
				if(event.which===13) {
					textInput.value = '';
					carLot.setCarsArray(carLot.getCarsArray());
					cloneNode(textInput);
					textInput = document.getElementById("textInput");
					cards[index].focus();
				};
			};

		var addSubmitButtonEventListener = function() {
			submitButton.addEventListener("click", function() {
				textInput.value = '';
				carLot.setCarsArray(carLot.getCarsArray());
				cloneNode(textInput);
				textInput = document.getElementById("textInput");
				cards[index].focus();
			})
		};

		var addTextInputEventListener = function(index) {
			textInput.value = '';
			cloneNode(textInput);
			textInput = document.getElementById("textInput");
			textInput.focus();
			textInput.addEventListener("keyup", function(event) {
				addTextInputkEventListenerCallback(event, index);
			});
		};

		var addCardsEventListeners = function() {
			for (var i = 0; i < cards.length; i++) {
				cards[i].addEventListener("click", addCardsEventListenersCallback);
			};
		}();
	};


	
	//RETURNS OBJECT WITH NEW METHODS ATTACHED//	
	return object;	

//INVOKES FUNCTION WITH EMPTY OBJECT IF CAR LOT HAS NOT YET INITIALIZED//
})(carLot || {});
