import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LocationLookupComponent extends Component {
  @tracked lat;
  @tracked long;
  @tracked showLayout = false;

  @action
  done(args) {
    this.showLayout = true;
  }

  @action
  placeChanged(args) {
    this.lat = args.geometry.viewport.La.g;
    this.long = args.geometry.viewport.Ta.g;
  }
}
