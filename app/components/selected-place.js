import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SelectedPlaceComponent extends Component {
  @tracked temperature = null;
  @tracked isLoading = null;

  constructor() {
    super(...arguments);
    this.getWeatherData();
  }

  @action
  async getWeatherData() {
    let { selected_latitude, selected_longitude } = this.args;
    let APIKEY = '268f4dc9b3c9ca8f42e0a3feb76cdf9c';

    this.isLoading = true;
    try {
      let response = await window.fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${selected_latitude}&lon=${selected_longitude}&appid=${APIKEY}&units=metric`
      );
      let json = await response.json();
      this.temperature = `${json?.current?.temp}°C`;
    } catch (error) {
      this.temperature = 'NA';
    } finally {
      this.isLoading = false;
    }
  }
}
