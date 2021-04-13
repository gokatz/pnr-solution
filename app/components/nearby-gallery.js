import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A as emberArray } from '@ember/array';

export default class NearbyGalleryComponent extends Component {
  @tracked currentCoordinates = emberArray([40.730610, -73.935242]); // [latitude, longitude]
  @tracked nearbyParks = emberArray([
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
}
