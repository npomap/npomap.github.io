var NPOMapApp = angular.module('NPOMapApp',[]);

NPOMapApp.controller('NPOMapAppCtrl', function($scope) {
    
    $scope.categories = [['Civil Rights','civil_rights'],
                         ['Education','education'],
                         ['Food','food'],
                         ['Health','health'],
                         ['Safety','safety']];
    
    $scope.codeAddress = function() {
      var address = document.getElementById("address").value;
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(16);
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
    
    function clearMarkers() {
        if ('markersArray' in window) {
            for (i in markersArray) {
                markersArray[i].setMap(null);
            }
        }
    }
    
    $scope.placePins = function() {
        
        if (data[$scope.formData.category] != null) {
            
            clearMarkers();
            var mapArray = data[$scope.formData.category];
            markersArray = [];
            var infowindow = new google.maps.InfoWindow();
            
            for (var i in mapArray) {
                var thislatlng = new google.maps.LatLng(mapArray[i]['Latitude'], mapArray[i]['Longitude']),
                contentString = mapArray[i]['Name'] + '<br />' + mapArray[i]['Address'] + '<br /><a href="rate.html">Rate this service</a>',
                marker = new google.maps.Marker({
                    map: map,
                    position: thislatlng,
                    information: contentString
                });
                
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(this.information);
                    infowindow.open(map, this);
                });
                
                markersArray.push(marker);
            }
        } else if ($scope.formData.category == '') {
            clearMarkers();
        } else {
            alert('Not available yet!');
            $('#category').select2('val', '');
            clearMarkers();
        }
    }
    
});
