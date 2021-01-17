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

export { testmodule };
