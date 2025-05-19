import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SubscriptionPlan } from '../interface/subscription';

@Component({
  selector: 'general-subscription-plan-form',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule],
  templateUrl: './subscription-plan-form.component.html',
  styleUrl: './subscription-plan-form.component.scss',
})
export class SubscriptionPlanFormComponent {
  @Input() subscription!: SubscriptionPlan;
  @Output() onAction: any = new EventEmitter<any>();
  constructor() {}

  handleClick(id: string, action: null | string = null) {
    let formAction = null;
    if (!action) {
      formAction = id === '' ? 'SAVE' : 'UPDATE';
    } else {
      formAction = action;
    }
    this.onAction.emit({ action: formAction, id, data: this.subscription });
  }
}
