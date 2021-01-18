/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "data": () => /* binding */ data
/* harmony export */ });
const data = (function() {

    let weatherdata = {
        city: "",
        country: "",
        weather: "",
        sale: "",
        temp: "",
        feels: "",
        humidity: "",
        icon: "",

    };

    return {
        weatherdata,
    };
})();



/***/ }),

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "events": () => /* binding */ events
/* harmony export */ });
/* harmony import */ var _methods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods.js */ "./src/methods.js");


const events = (function () {
  function initialize() {
    document.querySelector("form").reset();
    _methods_js__WEBPACK_IMPORTED_MODULE_0__.methods.getData(null, "Manila");

    const btn_search = document.getElementById("btn_search");
    btn_search.addEventListener("click", (event) => {
      console.clear();
      console.log("button pressed");
      event.preventDefault(); //prevents page from refresh before fetching finishes
      _methods_js__WEBPACK_IMPORTED_MODULE_0__.methods.getData(event);
    });

    const btn_switch = document.getElementById("btn_switch");
    btn_switch.addEventListener("click", (event) => {
      event.preventDefault(); //prevents page from refresh before fetching finishes
      _methods_js__WEBPACK_IMPORTED_MODULE_0__.methods.switchTemp();
    });
  }

  return {
    initialize,
  };
})();




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test.js */ "./src/test.js");
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events.js */ "./src/events.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data.js */ "./src/data.js");




window.data = _data_js__WEBPACK_IMPORTED_MODULE_2__.data; 
// testmodule.sample5();
_events_js__WEBPACK_IMPORTED_MODULE_1__.events.initialize();


/***/ }),

/***/ "./src/methods.js":
/*!************************!*\
  !*** ./src/methods.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "methods": () => /* binding */ methods
/* harmony export */ });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ "./src/data.js");


const methods = (function () {
  //conversion functions
  //converts fahrenheit to celsius :unicode: &#8451
  const convertToCelsius = function (temp) {
    let x = (temp - 32) * 0.5556;
    let rounded = Number(x.toFixed(1));
    return rounded;
  };

  //converts celsius to fahrenheit :unicode: &#8457
  const convertToFahrenheit = function (temp) {
    let x = temp * 1.8 + 32;
    let rounded = Number(x.toFixed(1));
    return rounded;
  };

  const switchTemp = function () {
    const btn_switch = document.getElementById("btn_switch");
    let converttemp, convertfeels;

    if (_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.scale == "celsius") {
      //convert to fahrenheit
      btn_switch.setAttribute("data-temp", "fahrenheit");
      btn_switch.textContent = "switch to Fahrenheit";
      converttemp = convertToFahrenheit(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.temp);
      convertfeels = convertToFahrenheit(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.feels);
      _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.scale = "fahrenheit";
      document.querySelector(".temp").innerHTML = converttemp + "&#8457";
      document.querySelector(".feels_temp").innerHTML = convertfeels + "&#8457";
    } else if (_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.scale == "fahrenheit") {
      //convert to celsius
      btn_switch.setAttribute("data-temp", "celsius");
      btn_switch.textContent = "switch to Celsius";
      converttemp = convertToCelsius(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.temp);
      convertfeels = convertToCelsius(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.feels);
      _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.scale = "celsius";
      document.querySelector(".temp").innerHTML = converttemp + "&#8451";
      document.querySelector(".feels_temp").innerHTML = convertfeels + "&#8451";
    }
    _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.temp = converttemp;
    _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.feels = convertfeels;
  };

  //this methods fetches the weather data from the api
  const getData = async function (event, init) {
    try {
      let city;
      let country;

      //for initial load of the page. default is Manila, PH weather
      if (init) {
        city = init;
      } else {
        city = document.getElementById("input_city").value;
        country = document.getElementById("input_country").value;
      }

      //if there is nothing in the search return
      if (city == "") return;

      let fetchdata;

      //if a country wass entered in the form
      if (country != "") {
        fetchdata = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=278d6561a2ca126e763327029c474e36`,
          { mode: "cors" }
        );
      } else {
        fetchdata = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=278d6561a2ca126e763327029c474e36`,
          { mode: "cors" }
        );
      }

      let getdata = await fetchdata.json();

      //if city is found
      if (getdata.cod == "200") {
        //remove error message
        document.querySelector(".error").classList.remove("display");

        //store data to local
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.city = getdata.city.name;
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.country = getdata.city.country;
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.weather = getdata.list[0].weather[0].description;
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.scale = "celsius";
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.temp = getdata.list[0].main.temp;
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.feels = getdata.list[0].main.feels_like;
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.humidity = getdata.list[0].main.humidity;
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.icon = getdata.list[0].weather[0].icon;

        //log
        console.log(getdata);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.city);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.country);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.weather);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.scale);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.temp);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.feels);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.humidity + "%");
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.icon);

        //display data to DOM
        document.querySelector(".city").textContent = _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.city;
        document.querySelector(".country").textContent =
          _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.country;
        document.querySelector(
          "img"
        ).src = `http://openweathermap.org/img/wn/${_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.icon}@2x.png`;
        document.querySelector(".weather").textContent =
          _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.weather;

        document.querySelector(".temp").innerHTML =
          Number(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.temp.toFixed(1)) + "&#8451";
        document.getElementById("btn_switch").textContent =
          "switch to Fahrenheit";
        document
          .getElementById("btn_switch")
          .setAttribute("data-temp", "celsius");
        document.querySelector(".feels_temp").innerHTML =
          Number(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.feels.toFixed(1)) + "&#8451";
        document.querySelector(".humidity").innerHTML =
          _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.humidity + "%";
      } else if (getdata.cod == "404") {
        console.log(getdata);
        console.log(`error: ${getdata.message}`);
        let error = document.querySelector(".error");
        error.classList.add("display");
        await setTimeout(() => {
          error.classList.remove("display");
        }, 5000);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return {
    getData,
    switchTemp,
  };
})();




/***/ }),

/***/ "./src/test.js":
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "testmodule": () => /* binding */ testmodule
/* harmony export */ });
const testmodule = (function () {
  let sample1 = 1;
  let sample2 = 2;
  let sample3 = "this variable is private do not return";
  let apiID = '278d6561a2ca126e763327029c474e36';

  function sample4() {
    console.log("sample only");
  }

  async function sample5() {
    try {
      let city = "manila";
      let fetchdata = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=278d6561a2ca126e763327029c474e36`,
        { mode: "cors" }
      );
      console.log(typeof fetchdata);
        
      console.log('done fetch');

      let getdata = await fetchdata.json();
      
      if(getdata.cod == "200"){
      console.log(getdata);
      console.log(getdata.city.name);
      console.log(getdata.city.country);
      console.log(getdata.list[0].weather[0].description);
      console.log(getdata.list[0].main.temp);
      console.log(getdata.list[0].main.feels_like);
      console.log(getdata.list[0].main.humidity + "%");
      // console.log(getdata.list[0].weather[0].main);
      // let weathericon = getdata.list[0].weather[0].icon
      // console.log(weathericon);

      }else if(getdata.cod == "404"){
      console.log(getdata);
      console.log(`error: ${getdata.message}`);
      }
      

      let img = document.querySelector('img');
      // img.src = `http://openweathermap.org/img/wn/${weathericon}@2x.png`;
      // img.setAttribute('style', "border: 2px solid black; border-radius: 5px;");








     
    
    } catch (err) {
      if(err.status == '404'){
      console.log('error please enter an appropriate location');
        return;
      }
      console.log(err.message);
    }
  }

  function sample6() {
    let city = "manila";
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=278d6561a2ca126e763327029c474e36`, 
      {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
    })
    .catch(function(err){
      console.log(err);
    });
  }

  return {
    sample1,
    sample2,
    sample4,
    sample5,
    sample6,
  };
})();




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tZXRob2RzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3Rlc3QuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQnNDOztBQUV2QztBQUNBO0FBQ0E7QUFDQSxJQUFJLHdEQUFlOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixNQUFNLHdEQUFlO0FBQ3JCLEtBQUs7O0FBRUw7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixNQUFNLDJEQUFrQjtBQUN4QixLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFaUI7Ozs7Ozs7Ozs7Ozs7OztBQzNCbUI7QUFDRjtBQUNKOztBQUUvQixjQUFjLDBDQUFJLEM7QUFDbEI7QUFDQSx5REFBaUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOZ0I7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLDREQUFzQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsMkRBQXFCO0FBQzdELHlDQUF5Qyw0REFBc0I7QUFDL0QsTUFBTSw0REFBc0I7QUFDNUI7QUFDQTtBQUNBLEtBQUssVUFBVSw0REFBc0I7QUFDckM7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDJEQUFxQjtBQUMxRCxzQ0FBc0MsNERBQXNCO0FBQzVELE1BQU0sNERBQXNCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLElBQUksMkRBQXFCO0FBQ3pCLElBQUksNERBQXNCO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxLQUFLLEdBQUcsUUFBUTtBQUNoRixXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQSxnRUFBZ0UsS0FBSztBQUNyRSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsMkRBQXFCO0FBQzdCLFFBQVEsOERBQXdCO0FBQ2hDLFFBQVEsOERBQXdCO0FBQ2hDLFFBQVEsNERBQXNCO0FBQzlCLFFBQVEsMkRBQXFCO0FBQzdCLFFBQVEsNERBQXNCO0FBQzlCLFFBQVEsK0RBQXlCO0FBQ2pDLFFBQVEsMkRBQXFCOztBQUU3QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFxQjtBQUN6QyxvQkFBb0IsOERBQXdCO0FBQzVDLG9CQUFvQiw4REFBd0I7QUFDNUMsb0JBQW9CLDREQUFzQjtBQUMxQyxvQkFBb0IsMkRBQXFCO0FBQ3pDLG9CQUFvQiw0REFBc0I7QUFDMUMsb0JBQW9CLCtEQUF5QjtBQUM3QyxvQkFBb0IsMkRBQXFCOztBQUV6QztBQUNBLHNEQUFzRCwyREFBcUI7QUFDM0U7QUFDQSxVQUFVLDhEQUF3QjtBQUNsQztBQUNBO0FBQ0Esb0RBQW9ELDJEQUFxQixDQUFDO0FBQzFFO0FBQ0EsVUFBVSw4REFBd0I7O0FBRWxDO0FBQ0EsaUJBQWlCLG1FQUE2QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsb0VBQThCO0FBQy9DO0FBQ0EsVUFBVSwrREFBeUI7QUFDbkMsT0FBTztBQUNQO0FBQ0EsOEJBQThCLGdCQUFnQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVrQjs7Ozs7Ozs7Ozs7Ozs7O0FDbEpuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxLQUFLO0FBQ25FLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1Qzs7O0FBR0E7QUFDQSx1REFBdUQsWUFBWTtBQUNuRSw0REFBNEQsb0JBQW9COzs7Ozs7Ozs7OztBQVdoRixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdFQUFnRSxLQUFLO0FBQ3JFLE9BQU8sYUFBYTtBQUNwQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRXFCOzs7Ozs7O1VDdkZ0QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRhdGEgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgd2VhdGhlcmRhdGEgPSB7XG4gICAgICAgIGNpdHk6IFwiXCIsXG4gICAgICAgIGNvdW50cnk6IFwiXCIsXG4gICAgICAgIHdlYXRoZXI6IFwiXCIsXG4gICAgICAgIHNhbGU6IFwiXCIsXG4gICAgICAgIHRlbXA6IFwiXCIsXG4gICAgICAgIGZlZWxzOiBcIlwiLFxuICAgICAgICBodW1pZGl0eTogXCJcIixcbiAgICAgICAgaWNvbjogXCJcIixcblxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB3ZWF0aGVyZGF0YSxcbiAgICB9O1xufSkoKTtcblxuZXhwb3J0IHtkYXRhfTsiLCJpbXBvcnQgeyBtZXRob2RzIH0gZnJvbSBcIi4vbWV0aG9kcy5qc1wiO1xuXG5jb25zdCBldmVudHMgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLnJlc2V0KCk7XG4gICAgbWV0aG9kcy5nZXREYXRhKG51bGwsIFwiTWFuaWxhXCIpO1xuXG4gICAgY29uc3QgYnRuX3NlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuX3NlYXJjaFwiKTtcbiAgICBidG5fc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUuY2xlYXIoKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiYnV0dG9uIHByZXNzZWRcIik7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvL3ByZXZlbnRzIHBhZ2UgZnJvbSByZWZyZXNoIGJlZm9yZSBmZXRjaGluZyBmaW5pc2hlc1xuICAgICAgbWV0aG9kcy5nZXREYXRhKGV2ZW50KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGJ0bl9zd2l0Y2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bl9zd2l0Y2hcIik7XG4gICAgYnRuX3N3aXRjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvL3ByZXZlbnRzIHBhZ2UgZnJvbSByZWZyZXNoIGJlZm9yZSBmZXRjaGluZyBmaW5pc2hlc1xuICAgICAgbWV0aG9kcy5zd2l0Y2hUZW1wKCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXRpYWxpemUsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBldmVudHMgfTtcbiIsImltcG9ydCB7dGVzdG1vZHVsZX0gZnJvbSAnLi90ZXN0LmpzJztcbmltcG9ydCB7ZXZlbnRzfSBmcm9tICcuL2V2ZW50cy5qcyc7XG5pbXBvcnQge2RhdGF9IGZyb20gJy4vZGF0YS5qcyc7XG5cbndpbmRvdy5kYXRhID0gZGF0YTsgXG4vLyB0ZXN0bW9kdWxlLnNhbXBsZTUoKTtcbmV2ZW50cy5pbml0aWFsaXplKCk7XG4iLCJpbXBvcnQgeyBkYXRhIH0gZnJvbSBcIi4vZGF0YS5qc1wiO1xuXG5jb25zdCBtZXRob2RzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy9jb252ZXJzaW9uIGZ1bmN0aW9uc1xuICAvL2NvbnZlcnRzIGZhaHJlbmhlaXQgdG8gY2Vsc2l1cyA6dW5pY29kZTogJiM4NDUxXG4gIGNvbnN0IGNvbnZlcnRUb0NlbHNpdXMgPSBmdW5jdGlvbiAodGVtcCkge1xuICAgIGxldCB4ID0gKHRlbXAgLSAzMikgKiAwLjU1NTY7XG4gICAgbGV0IHJvdW5kZWQgPSBOdW1iZXIoeC50b0ZpeGVkKDEpKTtcbiAgICByZXR1cm4gcm91bmRlZDtcbiAgfTtcblxuICAvL2NvbnZlcnRzIGNlbHNpdXMgdG8gZmFocmVuaGVpdCA6dW5pY29kZTogJiM4NDU3XG4gIGNvbnN0IGNvbnZlcnRUb0ZhaHJlbmhlaXQgPSBmdW5jdGlvbiAodGVtcCkge1xuICAgIGxldCB4ID0gdGVtcCAqIDEuOCArIDMyO1xuICAgIGxldCByb3VuZGVkID0gTnVtYmVyKHgudG9GaXhlZCgxKSk7XG4gICAgcmV0dXJuIHJvdW5kZWQ7XG4gIH07XG5cbiAgY29uc3Qgc3dpdGNoVGVtcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBidG5fc3dpdGNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5fc3dpdGNoXCIpO1xuICAgIGxldCBjb252ZXJ0dGVtcCwgY29udmVydGZlZWxzO1xuXG4gICAgaWYgKGRhdGEud2VhdGhlcmRhdGEuc2NhbGUgPT0gXCJjZWxzaXVzXCIpIHtcbiAgICAgIC8vY29udmVydCB0byBmYWhyZW5oZWl0XG4gICAgICBidG5fc3dpdGNoLnNldEF0dHJpYnV0ZShcImRhdGEtdGVtcFwiLCBcImZhaHJlbmhlaXRcIik7XG4gICAgICBidG5fc3dpdGNoLnRleHRDb250ZW50ID0gXCJzd2l0Y2ggdG8gRmFocmVuaGVpdFwiO1xuICAgICAgY29udmVydHRlbXAgPSBjb252ZXJ0VG9GYWhyZW5oZWl0KGRhdGEud2VhdGhlcmRhdGEudGVtcCk7XG4gICAgICBjb252ZXJ0ZmVlbHMgPSBjb252ZXJ0VG9GYWhyZW5oZWl0KGRhdGEud2VhdGhlcmRhdGEuZmVlbHMpO1xuICAgICAgZGF0YS53ZWF0aGVyZGF0YS5zY2FsZSA9IFwiZmFocmVuaGVpdFwiO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wXCIpLmlubmVySFRNTCA9IGNvbnZlcnR0ZW1wICsgXCImIzg0NTdcIjtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmVlbHNfdGVtcFwiKS5pbm5lckhUTUwgPSBjb252ZXJ0ZmVlbHMgKyBcIiYjODQ1N1wiO1xuICAgIH0gZWxzZSBpZiAoZGF0YS53ZWF0aGVyZGF0YS5zY2FsZSA9PSBcImZhaHJlbmhlaXRcIikge1xuICAgICAgLy9jb252ZXJ0IHRvIGNlbHNpdXNcbiAgICAgIGJ0bl9zd2l0Y2guc2V0QXR0cmlidXRlKFwiZGF0YS10ZW1wXCIsIFwiY2Vsc2l1c1wiKTtcbiAgICAgIGJ0bl9zd2l0Y2gudGV4dENvbnRlbnQgPSBcInN3aXRjaCB0byBDZWxzaXVzXCI7XG4gICAgICBjb252ZXJ0dGVtcCA9IGNvbnZlcnRUb0NlbHNpdXMoZGF0YS53ZWF0aGVyZGF0YS50ZW1wKTtcbiAgICAgIGNvbnZlcnRmZWVscyA9IGNvbnZlcnRUb0NlbHNpdXMoZGF0YS53ZWF0aGVyZGF0YS5mZWVscyk7XG4gICAgICBkYXRhLndlYXRoZXJkYXRhLnNjYWxlID0gXCJjZWxzaXVzXCI7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBcIikuaW5uZXJIVE1MID0gY29udmVydHRlbXAgKyBcIiYjODQ1MVwiO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVsc190ZW1wXCIpLmlubmVySFRNTCA9IGNvbnZlcnRmZWVscyArIFwiJiM4NDUxXCI7XG4gICAgfVxuICAgIGRhdGEud2VhdGhlcmRhdGEudGVtcCA9IGNvbnZlcnR0ZW1wO1xuICAgIGRhdGEud2VhdGhlcmRhdGEuZmVlbHMgPSBjb252ZXJ0ZmVlbHM7XG4gIH07XG5cbiAgLy90aGlzIG1ldGhvZHMgZmV0Y2hlcyB0aGUgd2VhdGhlciBkYXRhIGZyb20gdGhlIGFwaVxuICBjb25zdCBnZXREYXRhID0gYXN5bmMgZnVuY3Rpb24gKGV2ZW50LCBpbml0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBjaXR5O1xuICAgICAgbGV0IGNvdW50cnk7XG5cbiAgICAgIC8vZm9yIGluaXRpYWwgbG9hZCBvZiB0aGUgcGFnZS4gZGVmYXVsdCBpcyBNYW5pbGEsIFBIIHdlYXRoZXJcbiAgICAgIGlmIChpbml0KSB7XG4gICAgICAgIGNpdHkgPSBpbml0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRfY2l0eVwiKS52YWx1ZTtcbiAgICAgICAgY291bnRyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRfY291bnRyeVwiKS52YWx1ZTtcbiAgICAgIH1cblxuICAgICAgLy9pZiB0aGVyZSBpcyBub3RoaW5nIGluIHRoZSBzZWFyY2ggcmV0dXJuXG4gICAgICBpZiAoY2l0eSA9PSBcIlwiKSByZXR1cm47XG5cbiAgICAgIGxldCBmZXRjaGRhdGE7XG5cbiAgICAgIC8vaWYgYSBjb3VudHJ5IHdhc3MgZW50ZXJlZCBpbiB0aGUgZm9ybVxuICAgICAgaWYgKGNvdW50cnkgIT0gXCJcIikge1xuICAgICAgICBmZXRjaGRhdGEgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5fSwke2NvdW50cnl9JnVuaXRzPW1ldHJpYyZhcHBpZD0yNzhkNjU2MWEyY2ExMjZlNzYzMzI3MDI5YzQ3NGUzNmAsXG4gICAgICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmZXRjaGRhdGEgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5fSZ1bml0cz1tZXRyaWMmYXBwaWQ9Mjc4ZDY1NjFhMmNhMTI2ZTc2MzMyNzAyOWM0NzRlMzZgLFxuICAgICAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBsZXQgZ2V0ZGF0YSA9IGF3YWl0IGZldGNoZGF0YS5qc29uKCk7XG5cbiAgICAgIC8vaWYgY2l0eSBpcyBmb3VuZFxuICAgICAgaWYgKGdldGRhdGEuY29kID09IFwiMjAwXCIpIHtcbiAgICAgICAgLy9yZW1vdmUgZXJyb3IgbWVzc2FnZVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVycm9yXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNwbGF5XCIpO1xuXG4gICAgICAgIC8vc3RvcmUgZGF0YSB0byBsb2NhbFxuICAgICAgICBkYXRhLndlYXRoZXJkYXRhLmNpdHkgPSBnZXRkYXRhLmNpdHkubmFtZTtcbiAgICAgICAgZGF0YS53ZWF0aGVyZGF0YS5jb3VudHJ5ID0gZ2V0ZGF0YS5jaXR5LmNvdW50cnk7XG4gICAgICAgIGRhdGEud2VhdGhlcmRhdGEud2VhdGhlciA9IGdldGRhdGEubGlzdFswXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgICAgICBkYXRhLndlYXRoZXJkYXRhLnNjYWxlID0gXCJjZWxzaXVzXCI7XG4gICAgICAgIGRhdGEud2VhdGhlcmRhdGEudGVtcCA9IGdldGRhdGEubGlzdFswXS5tYWluLnRlbXA7XG4gICAgICAgIGRhdGEud2VhdGhlcmRhdGEuZmVlbHMgPSBnZXRkYXRhLmxpc3RbMF0ubWFpbi5mZWVsc19saWtlO1xuICAgICAgICBkYXRhLndlYXRoZXJkYXRhLmh1bWlkaXR5ID0gZ2V0ZGF0YS5saXN0WzBdLm1haW4uaHVtaWRpdHk7XG4gICAgICAgIGRhdGEud2VhdGhlcmRhdGEuaWNvbiA9IGdldGRhdGEubGlzdFswXS53ZWF0aGVyWzBdLmljb247XG5cbiAgICAgICAgLy9sb2dcbiAgICAgICAgY29uc29sZS5sb2coZ2V0ZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEud2VhdGhlcmRhdGEuY2l0eSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEud2VhdGhlcmRhdGEuY291bnRyeSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEud2VhdGhlcmRhdGEud2VhdGhlcik7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEud2VhdGhlcmRhdGEuc2NhbGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLndlYXRoZXJkYXRhLnRlbXApO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLndlYXRoZXJkYXRhLmZlZWxzKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS53ZWF0aGVyZGF0YS5odW1pZGl0eSArIFwiJVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS53ZWF0aGVyZGF0YS5pY29uKTtcblxuICAgICAgICAvL2Rpc3BsYXkgZGF0YSB0byBET01cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5XCIpLnRleHRDb250ZW50ID0gZGF0YS53ZWF0aGVyZGF0YS5jaXR5O1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdW50cnlcIikudGV4dENvbnRlbnQgPVxuICAgICAgICAgIGRhdGEud2VhdGhlcmRhdGEuY291bnRyeTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBcImltZ1wiXG4gICAgICAgICkuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS53ZWF0aGVyZGF0YS5pY29ufUAyeC5wbmdgO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXJcIikudGV4dENvbnRlbnQgPVxuICAgICAgICAgIGRhdGEud2VhdGhlcmRhdGEud2VhdGhlcjtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBcIikuaW5uZXJIVE1MID1cbiAgICAgICAgICBOdW1iZXIoZGF0YS53ZWF0aGVyZGF0YS50ZW1wLnRvRml4ZWQoMSkpICsgXCImIzg0NTFcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5fc3dpdGNoXCIpLnRleHRDb250ZW50ID1cbiAgICAgICAgICBcInN3aXRjaCB0byBGYWhyZW5oZWl0XCI7XG4gICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgLmdldEVsZW1lbnRCeUlkKFwiYnRuX3N3aXRjaFwiKVxuICAgICAgICAgIC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRlbXBcIiwgXCJjZWxzaXVzXCIpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWxzX3RlbXBcIikuaW5uZXJIVE1MID1cbiAgICAgICAgICBOdW1iZXIoZGF0YS53ZWF0aGVyZGF0YS5mZWVscy50b0ZpeGVkKDEpKSArIFwiJiM4NDUxXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtaWRpdHlcIikuaW5uZXJIVE1MID1cbiAgICAgICAgICBkYXRhLndlYXRoZXJkYXRhLmh1bWlkaXR5ICsgXCIlXCI7XG4gICAgICB9IGVsc2UgaWYgKGdldGRhdGEuY29kID09IFwiNDA0XCIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZ2V0ZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBlcnJvcjogJHtnZXRkYXRhLm1lc3NhZ2V9YCk7XG4gICAgICAgIGxldCBlcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXJyb3JcIik7XG4gICAgICAgIGVycm9yLmNsYXNzTGlzdC5hZGQoXCJkaXNwbGF5XCIpO1xuICAgICAgICBhd2FpdCBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBlcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzcGxheVwiKTtcbiAgICAgICAgfSwgNTAwMCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZ2V0RGF0YSxcbiAgICBzd2l0Y2hUZW1wLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgbWV0aG9kcyB9O1xuIiwiY29uc3QgdGVzdG1vZHVsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBzYW1wbGUxID0gMTtcbiAgbGV0IHNhbXBsZTIgPSAyO1xuICBsZXQgc2FtcGxlMyA9IFwidGhpcyB2YXJpYWJsZSBpcyBwcml2YXRlIGRvIG5vdCByZXR1cm5cIjtcbiAgbGV0IGFwaUlEID0gJzI3OGQ2NTYxYTJjYTEyNmU3NjMzMjcwMjljNDc0ZTM2JztcblxuICBmdW5jdGlvbiBzYW1wbGU0KCkge1xuICAgIGNvbnNvbGUubG9nKFwic2FtcGxlIG9ubHlcIik7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBzYW1wbGU1KCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgY2l0eSA9IFwibWFuaWxhXCI7XG4gICAgICBsZXQgZmV0Y2hkYXRhID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2NpdHl9JnVuaXRzPW1ldHJpYyZhcHBpZD0yNzhkNjU2MWEyY2ExMjZlNzYzMzI3MDI5YzQ3NGUzNmAsXG4gICAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiBmZXRjaGRhdGEpO1xuICAgICAgICBcbiAgICAgIGNvbnNvbGUubG9nKCdkb25lIGZldGNoJyk7XG5cbiAgICAgIGxldCBnZXRkYXRhID0gYXdhaXQgZmV0Y2hkYXRhLmpzb24oKTtcbiAgICAgIFxuICAgICAgaWYoZ2V0ZGF0YS5jb2QgPT0gXCIyMDBcIil7XG4gICAgICBjb25zb2xlLmxvZyhnZXRkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKGdldGRhdGEuY2l0eS5uYW1lKTtcbiAgICAgIGNvbnNvbGUubG9nKGdldGRhdGEuY2l0eS5jb3VudHJ5KTtcbiAgICAgIGNvbnNvbGUubG9nKGdldGRhdGEubGlzdFswXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uKTtcbiAgICAgIGNvbnNvbGUubG9nKGdldGRhdGEubGlzdFswXS5tYWluLnRlbXApO1xuICAgICAgY29uc29sZS5sb2coZ2V0ZGF0YS5saXN0WzBdLm1haW4uZmVlbHNfbGlrZSk7XG4gICAgICBjb25zb2xlLmxvZyhnZXRkYXRhLmxpc3RbMF0ubWFpbi5odW1pZGl0eSArIFwiJVwiKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGdldGRhdGEubGlzdFswXS53ZWF0aGVyWzBdLm1haW4pO1xuICAgICAgLy8gbGV0IHdlYXRoZXJpY29uID0gZ2V0ZGF0YS5saXN0WzBdLndlYXRoZXJbMF0uaWNvblxuICAgICAgLy8gY29uc29sZS5sb2cod2VhdGhlcmljb24pO1xuXG4gICAgICB9ZWxzZSBpZihnZXRkYXRhLmNvZCA9PSBcIjQwNFwiKXtcbiAgICAgIGNvbnNvbGUubG9nKGdldGRhdGEpO1xuICAgICAgY29uc29sZS5sb2coYGVycm9yOiAke2dldGRhdGEubWVzc2FnZX1gKTtcbiAgICAgIH1cbiAgICAgIFxuXG4gICAgICBsZXQgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgICAvLyBpbWcuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7d2VhdGhlcmljb259QDJ4LnBuZ2A7XG4gICAgICAvLyBpbWcuc2V0QXR0cmlidXRlKCdzdHlsZScsIFwiYm9yZGVyOiAycHggc29saWQgYmxhY2s7IGJvcmRlci1yYWRpdXM6IDVweDtcIik7XG5cblxuXG5cblxuXG5cblxuICAgICBcbiAgICBcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmKGVyci5zdGF0dXMgPT0gJzQwNCcpe1xuICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHBsZWFzZSBlbnRlciBhbiBhcHByb3ByaWF0ZSBsb2NhdGlvbicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2FtcGxlNigpIHtcbiAgICBsZXQgY2l0eSA9IFwibWFuaWxhXCI7XG4gICAgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7Y2l0eX0mdW5pdHM9bWV0cmljJmFwcGlkPTI3OGQ2NTYxYTJjYTEyNmU3NjMzMjcwMjljNDc0ZTM2YCwgXG4gICAgICB7bW9kZTogJ2NvcnMnfSlcbiAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KVxuICAgIC50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKGpzb24pO1xuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uKGVycil7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzYW1wbGUxLFxuICAgIHNhbXBsZTIsXG4gICAgc2FtcGxlNCxcbiAgICBzYW1wbGU1LFxuICAgIHNhbXBsZTYsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyB0ZXN0bW9kdWxlIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=