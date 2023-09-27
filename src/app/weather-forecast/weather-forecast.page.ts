import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Geolocation } from '@capacitor/geolocation';
import { latLong } from '../interfaces/weather';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.page.html',
  styleUrls: ['./weather-forecast.page.scss'],
})
export class WeatherForecastPage implements OnInit {
  getData: any = [];
  getHourlyData: any = [];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    console.log(new Date(1661871600))
    this.currentLocation();
  }

  async currentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    const latLongObj = {
      lat: coordinates.coords.latitude,
      long: coordinates.coords.longitude
    }
    this.forecaste(latLongObj);
  }

  forecaste(latLongObj: latLong) {
    this._httpService.forecast(latLongObj).subscribe((res: any) => {
      if (res) {
        console.log(res)
        res.list.slice(0, 5).filter((ele:any) => {
          console.log(ele);
          ele.time = new Date(ele.dt * 1000).toLocaleTimeString('en-us', {hour12: false , hour: '2-digit', minute:'2-digit'});
          ele.realTemp = (ele.main.temp - 273.15).toFixed();
          this.getHourlyData.push(ele);
          
        })
        console.log(this.getHourlyData)
      }
    })
  }

}
