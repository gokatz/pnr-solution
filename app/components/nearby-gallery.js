import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A as emberArray } from '@ember/array';

export default class NearbyGalleryComponent extends Component {
  @tracked nearbyParks = emberArray([]);
  @tracked currentIdx= -1;
  carousel = null;

  constructor() {
    super(...arguments);
    this.fetchParks(); // will be called with passed down longitude and latitude values
  }

  willDestroyElement() {
    if(this.carousel) clearInterval(this.carousel);
    super.willDestroyElement(...arguments);
  }

  get currentImage(){
    return this.nearbyParks[this.currentIdx];
  }

  @action 
  fetchParks() { // fetches parks based on latitude and longitude after we get passed longitutde and latitude
    this.nearbyParks = emberArray([
      { 
        name: 'Yosite National Park',
        url: 'https://i.natgeofe.com/n/f14f6c30-8d11-4e33-a5e9-05f1b50bdde3/yosemite-national-park-california.jpg'
      }, 
      {
        name: 'Central Park',
        url: 'https://cdn.britannica.com/71/189171-050-B4A7DA05/Central-Park-New-York-City.jpg'
      }, 
      {
        name: 'Great Smoky Mountains National Park',
        url: 'https://friendsofthesmokies.org/wp-content/uploads/2016/06/611-Elk-Eco-Tour.jpg'
      }, 
      {
        name: 'Prospect Park',
        url:  'https://media.timeout.com/images/105304089/1024/576/image.jpg'
      }, 
      {
        name: 'Kaiser Park',
        url: 'https://lh5.googleusercontent.com/-EG57WH46LG4/V6M1KTmLjSI/AAAAAAAACec/I9dfHzC3zbAsMEe6_DoSFlKF5SIK7dcYwCJkC/photo.jpg'
      }
    ]);
    if(this.nearbyParks.length > 0){
      this.currentIdx = 0;
      this.carousel = setInterval(this.changePark, 4500);
    }
  }

  @action 
  changePark() { // changes the carousel park
    if(this.currentIdx >= this.nearbyParks.length - 1) {
      this.currentIdx = 0;
    } else {
      this.currentIdx += 1;
    }
  }
}
