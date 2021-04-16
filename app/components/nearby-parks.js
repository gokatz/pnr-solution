import Component from '@glimmer/component';
import { getGoogleMap } from '../helpers/get-google-map';

export default class NearbyParksComponent extends Component {

    constructor() {
        super(...arguments);
        let lat = this.args.latitude;
        let long = this.args.longitude;

        let googleMapsPromise = getGoogleMap();

        Promise.all([googleMapsPromise]).then(values => {
            let google = values[0];
            // var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

            var statenIsland = new google.maps.LatLng(lat, long);

            var map = new google.maps.Map(document.getElementById('map'), {
                center: statenIsland,
                zoom: 15
              });

            var request = {
                location: statenIsland,
                radius: '1000',
                type: ['park', 'nature'],
            };
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, (results, status) => {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                      console.log(results[i]);
                    }
                  }
            });
        });

    }
}
