import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  title = 'navBarDarkMode';
  sideNavStatus: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
