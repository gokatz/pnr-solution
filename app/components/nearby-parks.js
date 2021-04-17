import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action, set } from '@ember/object';
import { getGoogleMap } from '../helpers/get-google-map';
import { A } from '@ember/array';

export default class NearbyParksComponent extends Component {

    @tracked parks = A([]);

    @action
    appendResult(result) {
        this.parks.pushObject(result);
    }

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
                type: ['park'],
            };
            
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, (results, status) => {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                      console.log(results[i]);
                      this.appendResult(results[i]);
                    }
                }
            });
            console.log(this.parks);
        });
    }

}
