function initMap() {
    // var carupano = {lat: 10.652, lng: -63.249};
    var portoAlegre = {lat: -30.046, lng: -51.224};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: portoAlegre
    });
    var marker = new google.maps.Marker({
      position: portoAlegre,
      map: map
    });
}