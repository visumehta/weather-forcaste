import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { latLong } from '../interfaces/weather';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  getAPI(currentLocation: latLong) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.lat}&lon=${currentLocation.long}&appid=fe50f81df459f08ba7a1c7af9f289c18`).pipe(map((res: any) => {
      return res;
    }));
  }

  getByCityName(cityName: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fe50f81df459f08ba7a1c7af9f289c18`).pipe(map((res: any) => {
      return res;
    }));
  }

  forecast(latLong: latLong) {
    console.log(latLong)
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latLong.lat}&lon=${latLong.long}&appid=fe50f81df459f08ba7a1c7af9f289c18`).pipe(map((res: any) => {
      return res
    }));
  }
}
