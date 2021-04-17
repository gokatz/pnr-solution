import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action, set } from '@ember/object';
// import { A } from '@ember/array';

export default class BaseComponentComponent extends Component {

    @tracked latitude = 40.631010;
    @tracked longitude = -74.149410;

}
