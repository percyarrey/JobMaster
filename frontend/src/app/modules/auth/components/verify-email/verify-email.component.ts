import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent {
  @Output() submitFormData = new EventEmitter<any>();
}
