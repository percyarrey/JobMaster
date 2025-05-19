import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [MessageService],
})
export class DashboardComponent {
  constructor(private messageService: MessageService) {
    this.data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Visitors',
          data: [250, 350, 300, 450, 400, 500],
          borderColor: '#6DA4D3',
          fill: false,
          lineTension: 0.2,
        },
        {
          label: 'Agencies',
          data: [100, 120, 150, 180, 200, 220],
          borderColor: '#88D9C3',
          fill: false,
          lineTension: 0.2,
        },
      ],
    };
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

  link = 'https://example.com';

  copyLink() {
    const linkElement = document.getElementById('link') as HTMLAnchorElement;
    const tempInput = document.createElement('input');
    tempInput.value = linkElement.innerText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    this.messageService.add({
      severity: 'success',
      summary: 'Link Copied',
      detail: 'Link copied successfully!',
    });
  }

  data: any;
}
