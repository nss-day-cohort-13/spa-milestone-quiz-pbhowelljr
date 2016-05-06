
//**********//QUIZ//**********//
var carLot = function(object) {

	var cards = document.getElementsByClassName('cards');

	cars = [];

	var writeToDom = function(cardString, elem) {
		elem.innerHTML = cardString;
	};

	var contentBuilder = function(carsArray) {
		
		for (var i = 0; i < carsArray.length; i++) {
			content = '';
			content += (
				`<ul>`+
				`<li>${carsArray[i].make}</li>`+
				`<li>${carsArray[i].model}</li>`+
				`<li>${carsArray[i].year}</li>`+
				`<li>${carsArray[i].price}</li>`+
				`<li>${carsArray[i].color}</li>`+
				`<li>${carsArray[i].purchased}</li>`+
				`<li>${carsArray[i].description}</li>`+
				`</ul>`
				);
			writeToDom(content, cards[i]);
		};
	};



	object.setCarsItem = function(object) {
		cars[cars.length] = object;
		contentBuilder(cars);
	};

	object.setCarsArray = function(array) {
		cars = array;
		contentBuilder(cars);
	};

	object.getCarsArray = function() {
		return cars;
	};

	object.loadInventory = function() {
		//CALL BACK FOR XHR REQUEST LOAD EVENT LISTENER//
		var addXhr = function () {
			var pojo = JSON.parse(this.responseText);
			for (var i = 0; i < pojo.cars.length; i++) {
				carLot.setCarsItem(pojo.cars[i]);
			};
		};
		//ADDS EVENT LISTENERS FOR XHR LOAD//
		var addXhrEventListener = function(request) {
			request.addEventListener("load", addXhr);
			request.addEventListener("error", function() {
				console.log("error");
			});
		};
		//INITIALIZE XHR REQUEST//
		var load = function() {
			var loadRequest = new XMLHttpRequest();
			addXhrEventListener(loadRequest);
			loadRequest.open("GET", "../json/inventory.json");
			loadRequest.send();
		}();
	}();
	
	//RETURNS OBJECT WITH NEW METHODS ATTACHED//	
	return object;	

//INVOKES FUNCTION WITH EMPTY OBJECT IF CAR LOT HAS NOT YET INITIALIZED//
}(carLot || {});
