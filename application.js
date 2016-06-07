var main = function(){

  'use strict';
    function onPositionReceived(position){
    console.log("A", position);
    $.ajax({
      method: 'GET',
      url: "https://api.forecast.io/forecast/82221b0bc29256ad8edfeb8f03f2ae35/" + position.coords.latitude + "," + position.coords.longitude,
      dataType: 'jsonp',
      success: function(result){
        console.log("C", result);
        var geocodingAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude +"&key=AIzaSyB_Wf6i4nSGTiMFh2vkdTGgBqIaM-xKJM0";

        // $.get("http://ipinfo.io", function(response) {
        //   console.log("D", response);
        //   $("#city-name").text(response.city);
        // }, "jsonp");
        $.getJSON(geocodingAPI, function (json) {
          console.log("E", json);
          $("#city-name").text(json.results[4].address_components[2].long_name);
        });
        $("#current-conditions").text(result.currently.summary);
        $("#current-temperature").append(((result.currently.temperature - 32) * 5/9).toFixed() + " " + "Celcius");

        var elem = document.createElement("img");
        switch(result.currently.summary){
        case "Cloudy":
        case "Partly Cloudy":
          elem.src = 'http://www.vtg.co.uk/wp-content/uploads/2014/02/icon-cloud-transparent.png';
          document.getElementById("weather-image").appendChild(elem);
        break;
        case "Clear":
          elem.src = 'http://www.iconsfind.com/wp-content/uploads/2015/11/20151125_565508763073c.png';
          document.getElementById("weather-image").appendChild(elem);
        break;
        case "Drizzle":
        case "Rain":
        case "Light Rain":
          // if(result.currently.temperature < 80){
          // $("#weather-advice").text("wear a jacket");}
          elem.src = 'http://apk-dl.com/detail/image/com.lehoang.chronusamigo-w250.png';
          document.getElementById("weather-image").appendChild(elem);
          $("#weather-description").text("fuck...its raining");
        break;
        }
      }
    });
  }

  function locationNotReceived(positionError){
    console.log("B", positionError);
  }

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onPositionReceived, locationNotReceived);//{timeout:5}
    var watch = navigator.geolocation.watchPosition(onPositionReceived, locationNotReceived);
    navigator.geolocation.clearWatch(watch);
  }
};

$(document).ready(main);
