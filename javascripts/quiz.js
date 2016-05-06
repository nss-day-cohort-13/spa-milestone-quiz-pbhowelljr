
//**********//QUIZ//**********//
var carLot = function(object) {
	
	var mainContent = document.getElementById("mainContent");
	cars = [];

	var writeToDom = function(content, elem) {
		elem.innerHTML = content;
	};

	var contentBuilder = function(carsArray) {
		var content = `<div class=row">`;
		for (var i = 0; i < carsArray.length; i++) {
			var item = carsArray[i];
			content += (
				`<div class="col-md-4">`+
				`<div class="cards" index="${i}" style="border: 3px solid ${item.color}">`+
				`<ul>`+
				`<li>Make: </li><li class="make">${item.make}</li>`+
				`<li>Model: </li><li class="model">${item.model}</li>`+
				`<li>Year: </li><li class="year">${item.year}</li>`+
				`<li>Price: </li><li class="price">${item.price}</li>`+
				`<li>Color: </li><li class="color">${item.color}</li>`+
				`<li>Purchased: </li><li class="purchased">${item.purchased}</li>`+
				`<li>Description: </li><li class="description">${item.description}</li>`+
				`</ul>`+
				`</div>`+
				`</div>`
				);
		};
		content += `</div>`;
		writeToDom(content, mainContent);
		carLot.activateEvents();
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
	}();
	
	//RETURNS OBJECT WITH NEW METHODS ATTACHED//	
	return object;	

//INVOKES FUNCTION WITH EMPTY OBJECT IF CAR LOT HAS NOT YET INITIALIZED//
}(carLot || {});
