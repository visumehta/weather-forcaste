import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'current-weather',
        loadChildren: () => import('../current-weather/current-weather.module').then( m => m.CurrentWeatherPageModule)
      },
      {
        path: 'weather-forecast',
        loadChildren: () => import('../weather-forecast/weather-forecast.module').then( m => m.WeatherForecastPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/current-weather',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/current-weather',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
