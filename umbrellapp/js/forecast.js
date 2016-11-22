//toggle menu
$(document).ready(function () {
    $(".menu-but").click(function () {
        $("header").toggle('slow');
    });
});


function forecast(value){
    var res = 0;
    switch(value) {
    case "Clear":
        res = "../icons/meteo/sun.svg";
        break;
    case "Rain":
        res = "../icons/meteo/rain.svg";
        break;
    case "Snow":
        res = "../icons/meteo/snow.svg";
        break;
    case "Clouds":
        res = "../icons/meteo/cloud.svg";
        break;        
    }
    return res;
}


function getNextDay(i){
    var d = new Date();
    var weekday = new Array(7);
    weekday[0]=  "SUN";
    weekday[1] = "MON";
    weekday[2] = "TUE";
    weekday[3] = "WED";
    weekday[4] = "THU";
    weekday[5] = "FRI";
    weekday[6] = "SAT";

    lastDay = weekday[d.getDay()+i];
    return lastDay;
}

//access url params
var res = location.search.split('res=')[1];
res = res.split(",");

var city = res[0] +" , "+res[1];
var weather = res[2];
var maxTemp = Math.round(res[3]);
var minTemp = Math.round(res[4]);

$(".today img").attr("src",forecast(weather));
$(".today .max-temp").html(maxTemp+" &deg;C");
$(".today .min-temp").html(minTemp+" &deg;C");
$("#location1").html(city);

var flag = 1;
for (i = 5; i < 20; i+=3) { 
    flag +=1;
    weather = res[i];
    maxTemp = Math.round(res[i+1]);
    minTemp = Math.round(res[i+2]);

    $("."+flag+" img").attr("src",forecast(weather));
    $("."+flag+" h4").html(getNextDay(flag-1));
    $("."+flag+" .max-temp").html(maxTemp+" &deg;C");
    $("."+flag+" .min-temp").html(minTemp+" &deg;C");
};
