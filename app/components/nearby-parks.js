import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action, set, get } from '@ember/object';
import { getGoogleMap } from '../helpers/get-google-map';
import { A } from '@ember/array';

//issues I have to solve urgently
/**
 * 1) Get the google embedded map to function (idea: make a child component exclusively for
 * the embedded map, and to that component pass the name of the place, will parse in the child js file)
 * 2) Make the dropdown list not expand the div; make it so that it overlaps elements/goes over
 *  elements below it, not push them
 * 3) Get more creative with how the syling (later on)
 */

export default class NearbyParksComponent extends Component {

    @tracked parks = A([]);  //used to store the results of the search
    @tracked selected_place = "";  //utilized for the currently selected result in this component
    @tracked selected_index = 0;  //utilized for the carousel/slides for the results
    @tracked selected_icon;  //google icon of what the location is
    @tracked selected_latitude;  //used for calculating the current distance
    @tracked selected_longitude;  //used for calculating the current distance
    @tracked selected_vicinity = " ";  //address of selected location
    @tracked selected_rating;  //rating score of selected location
    @tracked selected_user_ratings;  //number of ratings of the selection

    @tracked isSelecting = false;
    @tracked isSelected = false;
    @tracked isGoogleMapPop = false;

    //actions that act as switches
    @action
    toggleChoices() {
        if(this.isSelecting == false) {
            this.isSelecting = true;
        }
        else {
            this.isSelecting = false
        }
    }

    @action
    viewEmbeddedMap() {
        if(this.isSelected == true) {
            this.isGoogleMapPop = true
        }
    }

    @action
    closeEmbeddedMap() {
        this.isGoogleMapPop = false
    }

    //actions realted to the google query/embedded map
    @action
    updateGoogleLocation(search) {
        this.selected_place = (search).replaceAll(' ', '+');
    }

    @action
    currentSelection() {
        return ((this.selected_place).replaceAll('+', ' '))
    }

    @action
    queryMapSearch() {
        return ((this.selected_place).replaceAll(' ', '+'))
    }

    //actions related to the results
    @action
    appendResult(result) {
        this.parks.pushObject(result);
    }

    @action
    updateAllSelections(index) {
        this.selected_place = get(this.parks.objectAt(index), 'name')
        this.selected_icon = get(this.parks.objectAt(index), 'icon')
        this.selected_latitude = get(this.parks.objectAt(index), 'geometry.viewport.Ua.g')
        this.selected_longitude = get(this.parks.objectAt(index), 'geometry.viewport.La.g');
        this.selected_vicinity = get(this.parks.objectAt(index), 'vicinity');
        this.selected_rating = get(this.parks.objectAt(index), 'rating');
        this.selected_user_ratings = get(this.parks.objectAt(index), 'user_ratings_total');
        
        this.isSelected = true
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
        });
    }
}