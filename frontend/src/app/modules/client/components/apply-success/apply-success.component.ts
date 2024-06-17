import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-success',
  templateUrl: './apply-success.component.html',
  styleUrl: './apply-success.component.scss',
})
export class ApplySuccessComponent {
  constructor(private router: Router) {}
  onCloseClick() {
    this.router.navigate(['/']);
    // Add your logic here to handle the "Close" button click
  }
}
