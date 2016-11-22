//AYTOCOMPLETE
function initialize() {
    var input = document.getElementById('search');
    var autocomplete = new google.maps.places.Autocomplete(input);
};

google.maps.event.addDomListener(window, 'load', initialize);

//TOGGLE MENU
$(document).ready(function () {
    $(".menu-but").click(function () {
        $("header").toggle('slow');
    });
});

//forecast req
function requestWeek(location) {
    var last = location.length - 1;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = JSON.parse(this.responseText);
            var temp = [];
            for (i = 0; i < 6; i++) {
                temp[i] = [res.list[i].weather[0].main, res.list[i].main.temp_max, res.list[i].main.temp_min];
                console.log(i, temp[i]);
            }
            res = [location, temp];
            window.location = "./loader.html?res=" + res;
        }
    };
    xhttp.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=" + location[0] + "," + location[last] + "&mode=json&units=metric&cnt=6&appid=0ed3ad3f6e83e9b2538d44d5435453f2", true);
    xhttp.send();
}

//ACCESS LOCATION

function getReverseGeocodingData(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    var location;
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    var res = geocoder.geocode({
        'latLng': latlng
    }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
            alert(status);
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
            var address = (results[3].formatted_address);
            location = address.split(", ");
            var week = requestWeek(location);
        }
    });
}

$(document).ready(function () {
    $(".access").click(function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            getReverseGeocodingData(position.coords.latitude, position.coords.longitude);
        });

    });
});


//ENTER LOCATION
$(document).ready(function () {
    $("#submit").click(function () {
        var location = $("input:first").val();
        location = location.split(", ");
        var week = requestWeek(location);
    });
});