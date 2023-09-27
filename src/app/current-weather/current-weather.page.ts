import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Geolocation } from '@capacitor/geolocation';
import { latLong } from '../interfaces/weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.page.html',
  styleUrls: ['./current-weather.page.scss'],
})
export class CurrentWeatherPage implements OnInit {
  info: any;
  realTemp: string = '';
  temp = {
    feelsLike: '', humidity: '', pressure: '', wind: '', sunrise: '', sunset: ''
  }
  details: any[] = [];
  textHide = true;
  filteredCityHide = true;
  cities = ['jamnagar', 'rajkot', 'ahmedabad', 'london', 'korea', 'china', 'america'];
  filterCities = [...this.cities];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.watchPosition();
    this.currentLocation();

  }

  async watchPosition() {
    const watch = await Geolocation.watchPosition({}, (position, err) => { });
    this.clearPosition(watch)
  }

  async clearPosition(callBackId: string) {
    // const clearWatch = await Geolocation.clearWatch({ id: callBackId })
  }

  async currentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    const latLongObj = {
      lat: coordinates.coords.latitude,
      long: coordinates.coords.longitude
    }
    this.getData(latLongObj);
  }

  getData(latLong: latLong) {
    this._httpService.getAPI(latLong).subscribe((res: any) => {
      if (res) {
        this.info = res;
        const percent = this.info.main.temp;
        this.realTemp = (percent - 273.15).toFixed();
        this.temp.feelsLike = (this.info.main.feels_like - 273.15).toFixed();
        this.temp.humidity = this.info.main.humidity;
        this.temp.pressure = this.info.main.pressure;
        this.temp.wind = this.info.wind.speed;
        const timeFormate = { hour12: false };
        this.temp.sunrise = new Date(this.info.sys.sunrise * 1000).toLocaleTimeString('en-GB', timeFormate);
        this.temp.sunset = new Date(this.info.sys.sunset * 1000).toLocaleTimeString('en-GB', timeFormate);
        const detailss = [
          { name: 'FeelsLike', symbol: '', icon: 'thermometer-outline', value: this.temp.feelsLike },
          { name: 'Humidity', symbol: '%', icon: 'water-outline', value: this.temp.humidity },
          { name: 'Air Pressure', symbol: 'hPa', icon: 'cloud-outline', value: this.temp.pressure },
          { name: 'WNW wind', symbol: 'mi/h', icon: 'cloud-outline', value: this.temp.wind },
          { name: 'Sunrise', symbol: '', icon: 'sunny-outline', value: this.temp.sunrise },
          { name: 'Sunset', symbol: '', icon: 'sunny-outline', value: this.temp.sunset },
        ]
        this.details.push(...detailss)
      }
    });
  }

  onFocus() {
    this.textHide = false;
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.filterCities = this.cities.filter((d) => d.toLowerCase().indexOf(query) > -1);
    this.filteredCityHide = false;
  }

  click(result: string) {
    this._httpService.getByCityName(result).subscribe((res: any) => {
      if (res) {
        this.filteredCityHide = true;
        this.textHide = true;
        this.info = res;
        const percent = this.info.main.temp;
        this.realTemp = (percent - 273.15).toFixed();
        this.temp.feelsLike = (this.info.main.feels_like - 273.15).toFixed();
        this.temp.humidity = this.info.main.humidity;
        this.temp.pressure = this.info.main.pressure;
        this.temp.wind = this.info.wind.speed;
        const timeFormate = { hour12: false };
        this.temp.sunrise = new Date(this.info.sys.sunrise * 1000).toLocaleTimeString('en-GB', timeFormate);
        this.temp.sunset = new Date(this.info.sys.sunset * 1000).toLocaleTimeString('en-GB', timeFormate);
        const detailss = [
          { name: 'FeelsLike', symbol: '', icon: 'thermometer-outline', value: this.temp.feelsLike },
          { name: 'Humidity', symbol: '%', icon: 'water-outline', value: this.temp.humidity },
          { name: 'Air Pressure', symbol: 'hPa', icon: 'cloud-outline', value: this.temp.pressure },
          { name: 'WNW wind', symbol: 'mi/h', icon: 'cloud-outline', value: this.temp.wind },
          { name: 'Sunrise', symbol: '', icon: 'sunny-outline', value: this.temp.sunrise },
          { name: 'Sunset', symbol: '', icon: 'sunny-outline', value: this.temp.sunset },
        ]
        this.details.push(...detailss);
      }
    });
  }
}
