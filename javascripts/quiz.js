
//**********//QUIZ//**********//
var carLot = function(object) {

	cars = [];

	object.setCarsItem = function(object) {
		cars[cars.length] = object;
	};

	object.setCarsArray = function(array) {
		cars = array;
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
