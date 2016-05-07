//**********//EVENT HANDLERS//**********//
var carLot = (function(object) {

	//DECLARE DOM ELEMENT VARIABLES//
	var cards = document.getElementsByClassName("cards");
	var textInput = document.getElementById("textInput");
	var submitButton = document.getElementById("submitButton");

	//CLONES TARGET ELEMENT AND REPLACES OLD WITH NEW IN THE DOM//
	var cloneNode = function(oldElem) {
		var newElem = oldElem.cloneNode(true);
		oldElem.parentNode.replaceChild(newElem, oldElem);
	};

	var resetDom = function() {
		textInput.value = '';
		carLot.setCarsArray(carLot.getCarsArray());
		cloneNode(textInput);
		textInput = document.getElementById("textInput");
		mainContent.focus();
	};

	//OBJECT METHOD ADDS ALL DOM ELEMENT EVENT LISTENERS//
	object.activateEvents = function() {

		//CALLBACK FOR ADD CARDS EVENT LISTENERS//
		var cardsEventListenersCallback = function(event) {
			var index = event.currentTarget.getAttribute("index");
			if(cards[index].getAttribute("id") !== "selectedCard") {
				var borderStyle = event.currentTarget.getAttribute("style");
				var borderColor = borderStyle.slice(borderStyle.lastIndexOf(' '));
				carLot.changeSelected(index, borderColor);
				addTextInputEventListener(index);
				addSubmitButtonEventListener();
			} else {
				resetDom();
			};
			
		};

		//CALLBACK FOR ADD TEXT INPUT EVENT LISTENER//
		var textInputkEventListenerCallback =  function(event, index) {
			var description = cards[index].querySelector(".description");
			description.innerHTML = textInput.value;
			carLot.getCarsArray()[index].description = textInput.value;
			if(event.which===13) {
				resetDom();
			};
		};

		//ADDS EVENT LISTENER ON SUBMIT BUTTON FOR CLICK//
		var addSubmitButtonEventListener = function() {
			submitButton.addEventListener("click", function() {
				resetDom();
			})
		};

		//ADDS EVENT LISTENER ON TEXT INPUT FOR KEYUP//
		var addTextInputEventListener = function(index) {
			textInput.value = '';
			cloneNode(textInput);
			textInput = document.getElementById("textInput");
			textInput.focus();
			textInput.addEventListener("keyup", function(event) {
				textInputkEventListenerCallback(event, index);
			});
		};

		//ADDS EVENT LISTENERS ON CARD DIVS FOR CLICK//
		var addCardsEventListeners = function() {
			for (var i = 0; i < cards.length; i++) {
				cards[i].addEventListener("click", cardsEventListenersCallback);
			};
		}();
	};

	//RETURNS OBJECT WITH NEW METHOD ATTACHED//	
	return object;	

//INVOKES FUNCTION WITH EMPTY OBJECT IF CAR LOT HAS NOT YET INITIALIZED//
})(carLot || {});
