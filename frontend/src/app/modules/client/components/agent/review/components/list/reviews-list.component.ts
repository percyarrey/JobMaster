import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { ReviewsFormComponent } from '../form/reviews-form.component';
import { CommonModule } from '@angular/common';
import { Review } from '../../interface/reviews';
import { RatingModule } from 'primeng/rating';
import { StyleClassModule } from 'primeng/styleclass';
import { AgentDetails } from '../../../../../interfaces/agentDetails';
@Component({
  selector: 'reviews-list',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    ReviewsFormComponent,
    FieldsetModule,
    TableModule,
    CommonModule,
    RatingModule,
    StyleClassModule,
  ],
  templateUrl: './reviews-list.components.html',
})
export class ReviewsListComponent {
  @Input() reviews!: Review[];
  @Input() agent!: AgentDetails;
  @Output() onAction: any = new EventEmitter<any>();
  selectedReviews!: Review;
  constructor() {}

  review: any = {};

  handleClick(action: string, userId: string | null = null) {
    this.onAction.emit({ action, userId });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const currentDate = new Date();

    const yearDiff = currentDate.getFullYear() - date.getFullYear();
    const monthDiff = currentDate.getMonth() - date.getMonth();
    const dayDiff = currentDate.getDate() - date.getDate();

    if (yearDiff > 0) {
      return `${yearDiff} ${yearDiff === 1 ? 'year' : 'years'} ago`;
    } else if (monthDiff > 0) {
      return `${monthDiff} ${monthDiff === 1 ? 'month' : 'months'} ago`;
    } else if (dayDiff > 0) {
      const weekDiff = Math.floor(dayDiff / 7);
      return weekDiff > 0
        ? `${weekDiff} ${weekDiff === 1 ? 'week' : 'weeks'} ago`
        : `${dayDiff} ${dayDiff === 1 ? 'day' : 'days'} ago`;
    } else {
      return 'Today';
    }
  }
}
