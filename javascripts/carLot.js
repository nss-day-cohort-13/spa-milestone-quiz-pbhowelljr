//**********//MAIN//**********//
var carLot = (function(object) {
	
	//DECLARE DOM ELEMENT VARIABLES//
	var mainContent = document.getElementById("mainContent");

	//MAIN INVENTORY ARRAY//
	cars = [];

	//ADDS GIVEN CONTENT TO A GIVEN ELEMENT IN THE DOM//
	var writeToDom = function(content, elem) {
		elem.innerHTML = content;
	};

	//BUILDS HTML CONTENT FROM ARRAY OF CAR OBJECTS//
	var contentBuilder = function(carsArray) {
		var content = `<div class=row">`;
		for (var i = 0; i < carsArray.length; i++) {
			var item = carsArray[i];
			content += (
				`<div class="col-md-4">`+
					`<div class="cards" index="${i}" style="border: 3px solid ${item.color}">`+
						`<div class="row">`+
							`<div class="col-xs-4"><p>Make: </p></div>`+
							`<div class="col-xs-8"><p class="make">${item.make}</p></div>`+
						`</div>`+
						`<div class="row">`+
							`<div class="col-xs-4"><p>Model: </p></div>`+
							`<div class="col-xs-8"><p class="model">${item.model}</p></div>`+
						`</div>`+
						`<div class="row">`+
							`<div class="col-xs-4"><p>Year: </p></div>`+
							`<div class="col-xs-8"><p class="year">${item.year}</p></div>`+
						`</div>`+
						`<div class="row">`+
							`<div class="col-xs-4"><p>Price: </p></div>`+
							`<div class="col-xs-8"><p class="price">${item.price}</p></div>`+
						`</div>`+
						`<div class="row">`+
							`<div class="col-xs-4"><p>Color: </p></div>`+
							`<div class="col-xs-8"><p class="color">${item.color}</p></div>`+
						`</div>`+
						`<div class="row">`+
							`<div class="col-xs-4"><p>Purchased: </p></div>`+
							`<div class="col-xs-8"><p class="purchased">${item.purchased}</p></div>`+
						`</div>`+
						`<div class="row">`+
							`<div class="col-xs-4"><p>Description: </p></div>`+
							`<div class="col-xs-8"><p class="description">${item.description}</p></div>`+
						`</div>`+
					`</div>`+
				`</div>`
				);
		};
		content += `</div>`;
		writeToDom(content, mainContent);
		carLot.activateEvents();
	};

	//OBJECT METHOD SETS MAIN CARS ARRAY TO A GIVEN ARRAY//
	object.setCarsArray = function(array) {
		cars = array;
		contentBuilder(cars);
	};

	//OBJECT METHOD RETURNS MAIN CARS ARRAY//
	object.getCarsArray = function() {
		return cars;
	};
	
	//OBJECT METHOD EXECUTES XHR//
	//PARSES RETURNED DATA INTO OBJECT//
	object.loadInventory = function() {

		//CALL BACK FOR XHR REQUEST LOAD EVENT LISTENER//
		var addXhr = function () {
			var pojo = JSON.parse(this.responseText);
			var array = [];
			for (var i = 0; i < pojo.cars.length; i++) {
				array[array.length] = (pojo.cars[i]);
			};
			carLot.setCarsArray(array);
		};

		//ADDS EVENT LISTENERS FOR XHR LOAD//
		var addXhrEventListener = function(request) {
			request.addEventListener("load", addXhr);
			request.addEventListener("error", function() {
				console.log("error");
			});
		};

		//INITIALIZE XHR REQUEST//
		var loadRequest = new XMLHttpRequest();
		addXhrEventListener(loadRequest);
		loadRequest.open("GET", "../json/inventory.json");
		loadRequest.send();
	};
	
	//RETURNS OBJECT WITH NEW METHODS ATTACHED//	
	return object;	

//INVOKES FUNCTION WITH EMPTY OBJECT IF CAR LOT HAS NOT YET INITIALIZED//
})(carLot || {});
