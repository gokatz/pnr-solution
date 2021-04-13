import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LocationLookupComponent extends Component {
  @tracked lat;
  @tracked long;

  @action
  done(args) {
    console.log('Done:', args);
  }

  @action
  placeChanged(args) {
    this.lat = args.geometry.viewport.La.g;
    this.long = args.geometry.viewport.Ta.g;

    console.log(this.lat);
    console.log(this.long);
  }
}
