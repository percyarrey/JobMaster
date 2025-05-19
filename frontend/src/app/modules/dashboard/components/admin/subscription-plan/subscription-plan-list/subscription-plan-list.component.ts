import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { SubscriptionPlanComponent } from '../subscription-plan.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SubscriptionPlanFormComponent } from '../subscription-plan-form/subscription-plan-form.component';
import { CommonModule } from '@angular/common';
import { SubscriptionPlan } from '../interface/subscription';

@Component({
  selector: 'general-subscription-plan-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    SubscriptionPlanFormComponent,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './subscription-plan-list.component.html',
  styleUrl: './subscription-plan-list.component.scss',
})
export class SubscriptionPlanListComponent implements OnInit, OnChanges {
  @Input() subscriptions: SubscriptionPlan[] = [];
  @Output() onAction: any = new EventEmitter<any>();
  filteredSubscriptions: any = [];
  @Input() choosenSubscriptions!: SubscriptionPlan;

  constructor() {}

  ngOnInit(): void {
    this.filteredSubscriptions = this.subscriptions;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['subscriptions']) {
      this.filteredSubscriptions = changes['subscriptions'].currentValue || [];
    }
  }

  handleClick(action: string, id: string | null = null) {
    this.onAction.emit({ action, id });
  }
  search(text: Event) {
    const filteredValue = (text.target as HTMLInputElement).value;
    const result = this.filteredSubscriptions.filter((obj: any) => {
      return (
        obj.planName
          .toLowerCase()
          .includes(filteredValue.toLocaleLowerCase()) ||
        obj.cost.toLowerCase().includes(filteredValue.toLowerCase())
      );
    });
    this.subscriptions = result;
  }
}
