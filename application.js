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

        $.get("http://ipinfo.io", function(response) {
          console.log("D", response);
          $("#city-name").text(response.city);
        }, "jsonp");

        $("#current-conditions").text(result.currently.summary);
        $("#current-temperature").append(((result.currently.temperature - 32) * 5/9).toFixed() + " " + "Celcius");
        var elem = document.createElement("img");
        if (result.currently.summary === "Partly Cloudy"){
          elem.src = 'http://www.vtg.co.uk/wp-content/uploads/2014/02/icon-cloud-transparent.png';
          elem.setAttribute("height", "90");
          elem.setAttribute("width", "90");
          // elem.setAttribute("alt", "Flower");
          document.getElementById("weather-image").appendChild(elem);
        } else if (result.currently.summary === "Clear"){
          elem.src = 'http://www.iconsfind.com/wp-content/uploads/2015/11/20151125_565508763073c.png';
          elem.setAttribute("height", "90");
          elem.setAttribute("width", "90");
          document.getElementById("weather-image").appendChild(elem);
        }
        else if (result.currently.summary === ""){

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
