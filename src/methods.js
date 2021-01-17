import {data} from './data.js';

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
        data.weatherdata.city = getdata.city.name;
        data.weatherdata.country = getdata.city.country;
        data.weatherdata.weather = getdata.list[0].weather[0].description;
        data.weatherdata.temp = getdata.list[0].main.temp;
        data.weatherdata.feels = getdata.list[0].main.feels_like;
        data.weatherdata.humidity = getdata.list[0].main.humidity;
        data.weatherdata.icon = getdata.list[0].weather[0].icon;

        //log
        console.log(getdata);
        console.log(data.weatherdata.city);
        console.log(data.weatherdata.country);
        console.log(data.weatherdata.weather);
        console.log(data.weatherdata.temp);
        console.log(data.weatherdata.feels);
        console.log(data.weatherdata.humidity + "%");
        console.log(data.weatherdata.icon);

        //display data to DOM
        document.querySelector('.city').textContent = data.weatherdata.city;
        document.querySelector('.country').textContent = data.weatherdata.country;
        document.querySelector('img').src = `http://openweathermap.org/img/wn/${data.weatherdata.icon}@2x.png`;
        document.querySelector('.weather').textContent = data.weatherdata.weather;
        
        document.querySelector('.temp').innerHTML = Number(data.weatherdata.temp.toFixed(1)) + "&#8451";
        document.getElementById('btn_switch').textContent = 'switch to Fahrenheit';
        document.getElementById('btn_switch').setAttribute('data-temp', 'celsius');
        document.querySelector('.feels_temp').innerHTML = Number(data.weatherdata.feels.toFixed(1)) + '&#8451';
        document.querySelector('.humidity').innerHTML = data.weatherdata.humidity + "%";


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

export { methods };
