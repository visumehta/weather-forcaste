import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  isLoading = false;
  constructor(private loadingCtrl: LoadingController) { }

  async loader() {
    const loading = this.loadingCtrl.create({
      message: 'Please Wait',
      translucent: true,
    });
    (await loading).present();

  }
}
