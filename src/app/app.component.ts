import { Component } from '@angular/core';

export interface TabItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tabs: TabItem[] = [
    {
      label: 'En Proceso',
      icon: 'home',
      route: 'inprocess',
    },
    {
      label: 'En Revisión',
      icon: 'person',
      route: 'inreview',
    },
    {
      label: 'Rechazados',
      icon: 'search',
      route: 'rejected',
    },
  ];
}
