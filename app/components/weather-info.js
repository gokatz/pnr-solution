import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';

//const API_CALL = `http://api.openweathermap.org/data/2.5/weather?q=`+this.location+`&appid=07efe94c4fc280dd864102a15b10b386`

export default class WeatherInfoComponent extends Component {
    @tracked weather = null
    @tracked tempMin = null
    @tracked tempMax = null
    @tracked feelsLike = null
    @tracked temperature = null
    @tracked isCelsius = true
    @tracked location

    @tracked name = null

    @action
    async updateLocation(){
        const response = await fetch 
            (`http://api.openweathermap.org/data/2.5/weather?q=`+this.location+`&units=imperial&appid=8502264047828387cbb541a940397ad5`)
        const data = await response.json();
        console.log(data)

        this.name = data.name

        this.temperature = data.main.temp
        this.feelsLike = data.main.feels_like
        this.tempMax = data.main.temp_max
        this.tempMin = data.main.temp_min

        this.weather = data.weather[0].main
    }

    @action
    updateQuery(locationInput){
        this.location = locationInput.target.value
    }

    
}
