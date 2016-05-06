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
							`<div class="col-xs-6">Make: </div><div class="col-xs-6 make">${item.make}</div>`+
						`</div>`+
						`<div class="row">`+
							`<div class="col-xs-6">Model: </div><div class="col-xs-6 model">${item.model}</div>`+
						`</div>`+
						`<div class="row">`+
							`<div class="col-xs-6">Year: </div><div class="col-xs-6 year">${item.year}</div>`+
						`</div>`+
						`<div class="row">`+
							`<div class="col-xs-6">Price: </div><div class="col-xs-6 price">${item.price}</div>`+
						`</div>`+
						`<div class="row">`+
							`<div class="col-xs-6">Color: </div><div class="col-xs-6 color">${item.color}</div>`+
						`</div>`+
						`<div class="row">`+
							`<div class="col-xs-6">Purchased: </div><div class="col-xs-6 purchased">${item.purchased}</div>`+
						`</div>`+
						`<div class="row">`+
							`<div class="col-xs-6">Description: </div><div class="col-xs-6 description">${item.description}</div>`+
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
		var load = function() {
			var loadRequest = new XMLHttpRequest();
			addXhrEventListener(loadRequest);
			loadRequest.open("GET", "../json/inventory.json");
			loadRequest.send();
		}();
	};
	
	//RETURNS OBJECT WITH NEW METHODS ATTACHED//	
	return object;	

//INVOKES FUNCTION WITH EMPTY OBJECT IF CAR LOT HAS NOT YET INITIALIZED//
})(carLot || {});
