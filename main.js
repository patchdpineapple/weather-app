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
      console.log("switch pressed");

      event.preventDefault(); //prevents page from refresh before fetching finishes
      _methods_js__WEBPACK_IMPORTED_MODULE_0__.methods.switchTemp(event);
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
    //let rounded = Math.round((x * 10) / 10);
    let rounded = Number(x.toFixed(1));
    return rounded;
  };

  //converts celsius to fahrenheit :unicode: &#8457
  const convertToFahrenheit = function (temp) {
    let x = temp * 1.8 + 32;
    //let rounded = Math.round((x * 10) / 10);
    let rounded = Number(x.toFixed(1));
    return rounded;
  };

  const switchTemp = function(event){
    const btn_switch = document.getElementById('btn_switch');
    if(btn_switch.getAttribute('data-temp') == "celsius") {
        btn_switch.setAttribute('data-temp', 'fahrenheit');

    } else if(btn_switch.getAttribute('data-temp') == "fahrenheit"){
        btn_switch.setAttribute('data-temp', 'celsius');
    }

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
        
        //store data to local
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.city = getdata.city.name;
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.country = getdata.city.country;
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.weather = getdata.list[0].weather[0].description;
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.temp = getdata.list[0].main.temp;
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.feels = getdata.list[0].main.feels_like;
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.humidity = getdata.list[0].main.humidity;
        _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.icon = getdata.list[0].weather[0].icon;

        //log
        console.log(getdata);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.city);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.country);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.weather);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.temp);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.feels);
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.humidity + "%");
        console.log(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.icon);

        //display data to DOM
        document.querySelector('.city').textContent = _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.city;
        document.querySelector('.country').textContent = _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.country;
        document.querySelector('img').src = `http://openweathermap.org/img/wn/${_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.icon}@2x.png`;
        document.querySelector('.weather').textContent = _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.weather;
        
        document.querySelector('.temp').innerHTML = Number(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.temp.toFixed(1)) + "&#8451";
        document.getElementById('btn_switch').textContent = 'switch to Fahrenheit';
        document.getElementById('btn_switch').setAttribute('data-temp', 'celsius');
        document.querySelector('.feels_temp').innerHTML = Number(_data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.feels.toFixed(1)) + '&#8451';
        document.querySelector('.humidity').innerHTML = _data_js__WEBPACK_IMPORTED_MODULE_0__.data.weatherdata.humidity + "%";


      } else if (getdata.cod == "404") {
        console.log(getdata);
        console.log(`error: ${getdata.message}`);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  

  return {
    convertToCelsius,
    convertToFahrenheit,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tZXRob2RzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3Rlc3QuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEJzQzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0EsSUFBSSx3REFBZTs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsTUFBTSx3REFBZTtBQUNyQixLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSw2QkFBNkI7QUFDN0IsTUFBTSwyREFBa0I7QUFDeEIsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRWlCOzs7Ozs7Ozs7Ozs7OztBQzdCbUI7QUFDRjs7O0FBR25DO0FBQ0EseURBQWlCOzs7Ozs7Ozs7Ozs7Ozs7O0FDTGM7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0UsS0FBSyxHQUFHLFFBQVE7QUFDaEYsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQO0FBQ0EsZ0VBQWdFLEtBQUs7QUFDckUsV0FBVztBQUNYO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQVEsMkRBQXFCO0FBQzdCLFFBQVEsOERBQXdCO0FBQ2hDLFFBQVEsOERBQXdCO0FBQ2hDLFFBQVEsMkRBQXFCO0FBQzdCLFFBQVEsNERBQXNCO0FBQzlCLFFBQVEsK0RBQXlCO0FBQ2pDLFFBQVEsMkRBQXFCOztBQUU3QjtBQUNBO0FBQ0Esb0JBQW9CLDJEQUFxQjtBQUN6QyxvQkFBb0IsOERBQXdCO0FBQzVDLG9CQUFvQiw4REFBd0I7QUFDNUMsb0JBQW9CLDJEQUFxQjtBQUN6QyxvQkFBb0IsNERBQXNCO0FBQzFDLG9CQUFvQiwrREFBeUI7QUFDN0Msb0JBQW9CLDJEQUFxQjs7QUFFekM7QUFDQSxzREFBc0QsMkRBQXFCO0FBQzNFLHlEQUF5RCw4REFBd0I7QUFDakYsZ0ZBQWdGLDJEQUFxQixDQUFDO0FBQ3RHLHlEQUF5RCw4REFBd0I7O0FBRWpGLDJEQUEyRCxtRUFBNkI7QUFDeEY7QUFDQTtBQUNBLGlFQUFpRSxvRUFBOEI7QUFDL0Ysd0RBQXdELCtEQUF5Qjs7O0FBR2pGLE9BQU87QUFDUDtBQUNBLDhCQUE4QixnQkFBZ0I7QUFDOUM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFa0I7Ozs7Ozs7Ozs7Ozs7OztBQ3ZIbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsS0FBSztBQUNuRSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBLDRCQUE0QixnQkFBZ0I7QUFDNUM7OztBQUdBO0FBQ0EsdURBQXVELFlBQVk7QUFDbkUsNERBQTRELG9CQUFvQjs7Ozs7Ozs7Ozs7QUFXaEYsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnRUFBZ0UsS0FBSztBQUNyRSxPQUFPLGFBQWE7QUFDcEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVxQjs7Ozs7OztVQ3ZGdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYXRhID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgbGV0IHdlYXRoZXJkYXRhID0ge1xuICAgICAgICBjaXR5OiBcIlwiLFxuICAgICAgICBjb3VudHJ5OiBcIlwiLFxuICAgICAgICB3ZWF0aGVyOiBcIlwiLFxuICAgICAgICB0ZW1wOiBcIlwiLFxuICAgICAgICBmZWVsczogXCJcIixcbiAgICAgICAgaHVtaWRpdHk6IFwiXCIsXG4gICAgICAgIGljb246IFwiXCIsXG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgd2VhdGhlcmRhdGEsXG4gICAgfTtcbn0pKCk7XG5cbmV4cG9ydCB7ZGF0YX07IiwiaW1wb3J0IHsgbWV0aG9kcyB9IGZyb20gXCIuL21ldGhvZHMuanNcIjtcblxuY29uc3QgZXZlbnRzID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKS5yZXNldCgpO1xuICAgIG1ldGhvZHMuZ2V0RGF0YShudWxsLCBcIk1hbmlsYVwiKTtcblxuICAgIGNvbnN0IGJ0bl9zZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bl9zZWFyY2hcIik7XG4gICAgYnRuX3NlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBjb25zb2xlLmNsZWFyKCk7XG4gICAgICBjb25zb2xlLmxvZyhcImJ1dHRvbiBwcmVzc2VkXCIpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy9wcmV2ZW50cyBwYWdlIGZyb20gcmVmcmVzaCBiZWZvcmUgZmV0Y2hpbmcgZmluaXNoZXNcbiAgICAgIG1ldGhvZHMuZ2V0RGF0YShldmVudCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBidG5fc3dpdGNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5fc3dpdGNoXCIpO1xuICAgIGJ0bl9zd2l0Y2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coXCJzd2l0Y2ggcHJlc3NlZFwiKTtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy9wcmV2ZW50cyBwYWdlIGZyb20gcmVmcmVzaCBiZWZvcmUgZmV0Y2hpbmcgZmluaXNoZXNcbiAgICAgIG1ldGhvZHMuc3dpdGNoVGVtcChldmVudCk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXRpYWxpemUsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBldmVudHMgfTtcbiIsImltcG9ydCB7dGVzdG1vZHVsZX0gZnJvbSAnLi90ZXN0LmpzJztcbmltcG9ydCB7ZXZlbnRzfSBmcm9tICcuL2V2ZW50cy5qcyc7XG5cblxuLy8gdGVzdG1vZHVsZS5zYW1wbGU1KCk7XG5ldmVudHMuaW5pdGlhbGl6ZSgpO1xuIiwiaW1wb3J0IHtkYXRhfSBmcm9tICcuL2RhdGEuanMnO1xuXG5jb25zdCBtZXRob2RzID0gKGZ1bmN0aW9uICgpIHtcbiAgLy9jb252ZXJzaW9uIGZ1bmN0aW9uc1xuICAvL2NvbnZlcnRzIGZhaHJlbmhlaXQgdG8gY2Vsc2l1cyA6dW5pY29kZTogJiM4NDUxXG4gIGNvbnN0IGNvbnZlcnRUb0NlbHNpdXMgPSBmdW5jdGlvbiAodGVtcCkge1xuICAgIGxldCB4ID0gKHRlbXAgLSAzMikgKiAwLjU1NTY7XG4gICAgLy9sZXQgcm91bmRlZCA9IE1hdGgucm91bmQoKHggKiAxMCkgLyAxMCk7XG4gICAgbGV0IHJvdW5kZWQgPSBOdW1iZXIoeC50b0ZpeGVkKDEpKTtcbiAgICByZXR1cm4gcm91bmRlZDtcbiAgfTtcblxuICAvL2NvbnZlcnRzIGNlbHNpdXMgdG8gZmFocmVuaGVpdCA6dW5pY29kZTogJiM4NDU3XG4gIGNvbnN0IGNvbnZlcnRUb0ZhaHJlbmhlaXQgPSBmdW5jdGlvbiAodGVtcCkge1xuICAgIGxldCB4ID0gdGVtcCAqIDEuOCArIDMyO1xuICAgIC8vbGV0IHJvdW5kZWQgPSBNYXRoLnJvdW5kKCh4ICogMTApIC8gMTApO1xuICAgIGxldCByb3VuZGVkID0gTnVtYmVyKHgudG9GaXhlZCgxKSk7XG4gICAgcmV0dXJuIHJvdW5kZWQ7XG4gIH07XG5cbiAgY29uc3Qgc3dpdGNoVGVtcCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBjb25zdCBidG5fc3dpdGNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bl9zd2l0Y2gnKTtcbiAgICBpZihidG5fc3dpdGNoLmdldEF0dHJpYnV0ZSgnZGF0YS10ZW1wJykgPT0gXCJjZWxzaXVzXCIpIHtcbiAgICAgICAgYnRuX3N3aXRjaC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGVtcCcsICdmYWhyZW5oZWl0Jyk7XG5cbiAgICB9IGVsc2UgaWYoYnRuX3N3aXRjaC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGVtcCcpID09IFwiZmFocmVuaGVpdFwiKXtcbiAgICAgICAgYnRuX3N3aXRjaC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGVtcCcsICdjZWxzaXVzJyk7XG4gICAgfVxuXG4gIH07XG5cbiAgLy90aGlzIG1ldGhvZHMgZmV0Y2hlcyB0aGUgd2VhdGhlciBkYXRhIGZyb20gdGhlIGFwaVxuICBjb25zdCBnZXREYXRhID0gYXN5bmMgZnVuY3Rpb24gKGV2ZW50LCBpbml0KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBjaXR5O1xuICAgICAgbGV0IGNvdW50cnk7XG5cbiAgICAgIC8vZm9yIGluaXRpYWwgbG9hZCBvZiB0aGUgcGFnZS4gZGVmYXVsdCBpcyBNYW5pbGEsIFBIIHdlYXRoZXJcbiAgICAgIGlmIChpbml0KSB7XG4gICAgICAgIGNpdHkgPSBpbml0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRfY2l0eVwiKS52YWx1ZTtcbiAgICAgICAgY291bnRyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRfY291bnRyeVwiKS52YWx1ZTtcbiAgICAgIH1cblxuICAgICAgLy9pZiB0aGVyZSBpcyBub3RoaW5nIGluIHRoZSBzZWFyY2ggcmV0dXJuXG4gICAgICBpZiAoY2l0eSA9PSBcIlwiKSByZXR1cm47XG5cbiAgICAgIGxldCBmZXRjaGRhdGE7XG4gICAgICBcbiAgICAgIC8vaWYgYSBjb3VudHJ5IHdhc3MgZW50ZXJlZCBpbiB0aGUgZm9ybVxuICAgICAgaWYgKGNvdW50cnkgIT0gXCJcIikge1xuICAgICAgICBmZXRjaGRhdGEgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5fSwke2NvdW50cnl9JnVuaXRzPW1ldHJpYyZhcHBpZD0yNzhkNjU2MWEyY2ExMjZlNzYzMzI3MDI5YzQ3NGUzNmAsXG4gICAgICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmZXRjaGRhdGEgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5fSZ1bml0cz1tZXRyaWMmYXBwaWQ9Mjc4ZDY1NjFhMmNhMTI2ZTc2MzMyNzAyOWM0NzRlMzZgLFxuICAgICAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBsZXQgZ2V0ZGF0YSA9IGF3YWl0IGZldGNoZGF0YS5qc29uKCk7XG5cbiAgICAgIC8vaWYgY2l0eSBpcyBmb3VuZFxuICAgICAgaWYgKGdldGRhdGEuY29kID09IFwiMjAwXCIpIHtcbiAgICAgICAgXG4gICAgICAgIC8vc3RvcmUgZGF0YSB0byBsb2NhbFxuICAgICAgICBkYXRhLndlYXRoZXJkYXRhLmNpdHkgPSBnZXRkYXRhLmNpdHkubmFtZTtcbiAgICAgICAgZGF0YS53ZWF0aGVyZGF0YS5jb3VudHJ5ID0gZ2V0ZGF0YS5jaXR5LmNvdW50cnk7XG4gICAgICAgIGRhdGEud2VhdGhlcmRhdGEud2VhdGhlciA9IGdldGRhdGEubGlzdFswXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgICAgICBkYXRhLndlYXRoZXJkYXRhLnRlbXAgPSBnZXRkYXRhLmxpc3RbMF0ubWFpbi50ZW1wO1xuICAgICAgICBkYXRhLndlYXRoZXJkYXRhLmZlZWxzID0gZ2V0ZGF0YS5saXN0WzBdLm1haW4uZmVlbHNfbGlrZTtcbiAgICAgICAgZGF0YS53ZWF0aGVyZGF0YS5odW1pZGl0eSA9IGdldGRhdGEubGlzdFswXS5tYWluLmh1bWlkaXR5O1xuICAgICAgICBkYXRhLndlYXRoZXJkYXRhLmljb24gPSBnZXRkYXRhLmxpc3RbMF0ud2VhdGhlclswXS5pY29uO1xuXG4gICAgICAgIC8vbG9nXG4gICAgICAgIGNvbnNvbGUubG9nKGdldGRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLndlYXRoZXJkYXRhLmNpdHkpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLndlYXRoZXJkYXRhLmNvdW50cnkpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLndlYXRoZXJkYXRhLndlYXRoZXIpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLndlYXRoZXJkYXRhLnRlbXApO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLndlYXRoZXJkYXRhLmZlZWxzKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS53ZWF0aGVyZGF0YS5odW1pZGl0eSArIFwiJVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS53ZWF0aGVyZGF0YS5pY29uKTtcblxuICAgICAgICAvL2Rpc3BsYXkgZGF0YSB0byBET01cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpdHknKS50ZXh0Q29udGVudCA9IGRhdGEud2VhdGhlcmRhdGEuY2l0eTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50cnknKS50ZXh0Q29udGVudCA9IGRhdGEud2VhdGhlcmRhdGEuY291bnRyeTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW1nJykuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS53ZWF0aGVyZGF0YS5pY29ufUAyeC5wbmdgO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlcicpLnRleHRDb250ZW50ID0gZGF0YS53ZWF0aGVyZGF0YS53ZWF0aGVyO1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXAnKS5pbm5lckhUTUwgPSBOdW1iZXIoZGF0YS53ZWF0aGVyZGF0YS50ZW1wLnRvRml4ZWQoMSkpICsgXCImIzg0NTFcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bl9zd2l0Y2gnKS50ZXh0Q29udGVudCA9ICdzd2l0Y2ggdG8gRmFocmVuaGVpdCc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5fc3dpdGNoJykuc2V0QXR0cmlidXRlKCdkYXRhLXRlbXAnLCAnY2Vsc2l1cycpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlbHNfdGVtcCcpLmlubmVySFRNTCA9IE51bWJlcihkYXRhLndlYXRoZXJkYXRhLmZlZWxzLnRvRml4ZWQoMSkpICsgJyYjODQ1MSc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eScpLmlubmVySFRNTCA9IGRhdGEud2VhdGhlcmRhdGEuaHVtaWRpdHkgKyBcIiVcIjtcblxuXG4gICAgICB9IGVsc2UgaWYgKGdldGRhdGEuY29kID09IFwiNDA0XCIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZ2V0ZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBlcnJvcjogJHtnZXRkYXRhLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XG4gICAgfVxuICB9O1xuXG4gIFxuXG4gIHJldHVybiB7XG4gICAgY29udmVydFRvQ2Vsc2l1cyxcbiAgICBjb252ZXJ0VG9GYWhyZW5oZWl0LFxuICAgIGdldERhdGEsXG4gICAgc3dpdGNoVGVtcCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IG1ldGhvZHMgfTtcbiIsImNvbnN0IHRlc3Rtb2R1bGUgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgc2FtcGxlMSA9IDE7XG4gIGxldCBzYW1wbGUyID0gMjtcbiAgbGV0IHNhbXBsZTMgPSBcInRoaXMgdmFyaWFibGUgaXMgcHJpdmF0ZSBkbyBub3QgcmV0dXJuXCI7XG4gIGxldCBhcGlJRCA9ICcyNzhkNjU2MWEyY2ExMjZlNzYzMzI3MDI5YzQ3NGUzNic7XG5cbiAgZnVuY3Rpb24gc2FtcGxlNCgpIHtcbiAgICBjb25zb2xlLmxvZyhcInNhbXBsZSBvbmx5XCIpO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gc2FtcGxlNSgpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGNpdHkgPSBcIm1hbmlsYVwiO1xuICAgICAgbGV0IGZldGNoZGF0YSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtjaXR5fSZ1bml0cz1tZXRyaWMmYXBwaWQ9Mjc4ZDY1NjFhMmNhMTI2ZTc2MzMyNzAyOWM0NzRlMzZgLFxuICAgICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyh0eXBlb2YgZmV0Y2hkYXRhKTtcbiAgICAgICAgXG4gICAgICBjb25zb2xlLmxvZygnZG9uZSBmZXRjaCcpO1xuXG4gICAgICBsZXQgZ2V0ZGF0YSA9IGF3YWl0IGZldGNoZGF0YS5qc29uKCk7XG4gICAgICBcbiAgICAgIGlmKGdldGRhdGEuY29kID09IFwiMjAwXCIpe1xuICAgICAgY29uc29sZS5sb2coZ2V0ZGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyhnZXRkYXRhLmNpdHkubmFtZSk7XG4gICAgICBjb25zb2xlLmxvZyhnZXRkYXRhLmNpdHkuY291bnRyeSk7XG4gICAgICBjb25zb2xlLmxvZyhnZXRkYXRhLmxpc3RbMF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbik7XG4gICAgICBjb25zb2xlLmxvZyhnZXRkYXRhLmxpc3RbMF0ubWFpbi50ZW1wKTtcbiAgICAgIGNvbnNvbGUubG9nKGdldGRhdGEubGlzdFswXS5tYWluLmZlZWxzX2xpa2UpO1xuICAgICAgY29uc29sZS5sb2coZ2V0ZGF0YS5saXN0WzBdLm1haW4uaHVtaWRpdHkgKyBcIiVcIik7XG4gICAgICAvLyBjb25zb2xlLmxvZyhnZXRkYXRhLmxpc3RbMF0ud2VhdGhlclswXS5tYWluKTtcbiAgICAgIC8vIGxldCB3ZWF0aGVyaWNvbiA9IGdldGRhdGEubGlzdFswXS53ZWF0aGVyWzBdLmljb25cbiAgICAgIC8vIGNvbnNvbGUubG9nKHdlYXRoZXJpY29uKTtcblxuICAgICAgfWVsc2UgaWYoZ2V0ZGF0YS5jb2QgPT0gXCI0MDRcIil7XG4gICAgICBjb25zb2xlLmxvZyhnZXRkYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKGBlcnJvcjogJHtnZXRkYXRhLm1lc3NhZ2V9YCk7XG4gICAgICB9XG4gICAgICBcblxuICAgICAgbGV0IGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuICAgICAgLy8gaW1nLnNyYyA9IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke3dlYXRoZXJpY29ufUAyeC5wbmdgO1xuICAgICAgLy8gaW1nLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBcImJvcmRlcjogMnB4IHNvbGlkIGJsYWNrOyBib3JkZXItcmFkaXVzOiA1cHg7XCIpO1xuXG5cblxuXG5cblxuXG5cbiAgICAgXG4gICAgXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZihlcnIuc3RhdHVzID09ICc0MDQnKXtcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBwbGVhc2UgZW50ZXIgYW4gYXBwcm9wcmlhdGUgbG9jYXRpb24nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNhbXBsZTYoKSB7XG4gICAgbGV0IGNpdHkgPSBcIm1hbmlsYVwiO1xuICAgIGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke2NpdHl9JnVuaXRzPW1ldHJpYyZhcHBpZD0yNzhkNjU2MWEyY2ExMjZlNzYzMzI3MDI5YzQ3NGUzNmAsIFxuICAgICAge21vZGU6ICdjb3JzJ30pXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSlcbiAgICAudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgICBjb25zb2xlLmxvZyhqc29uKTtcbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbihlcnIpe1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2FtcGxlMSxcbiAgICBzYW1wbGUyLFxuICAgIHNhbXBsZTQsXG4gICAgc2FtcGxlNSxcbiAgICBzYW1wbGU2LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgdGVzdG1vZHVsZSB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9