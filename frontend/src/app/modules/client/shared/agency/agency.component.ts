import { Component, Input } from '@angular/core';
import { Agent } from '../../interfaces/agent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrl: './agency.component.scss',
})
export class AgencyComponent {
  @Input() agent!: Agent;
  constructor(public router: Router) {}

  ngOnInit(): void {
    /* console.log(this.country); */
  }
  textLength(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      text = text.slice(0, maxLength);
      text = text + '...';
    }
    text[0].toUpperCase();
    return text;
  }
  formatViews(views: number): string {
    if (views >= 1e6) {
      const thousands = Math.floor(views / 1e6);
      const decimal = ((views % 1e6) / 1e6).toFixed(1);
      return decimal === '0.0'
        ? thousands + 'M'
        : thousands + decimal.slice(1) + 'M';
    } else if (views >= 1e3) {
      const thousands = Math.floor(views / 1e3);
      const decimal = ((views % 1e3) / 1e3).toFixed(1);
      return decimal === '0.0'
        ? thousands + 'k'
        : thousands + decimal.slice(1) + 'k';
    } else {
      return views.toString();
    }
  }
}
