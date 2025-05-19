import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { Review } from '../../interface/reviews';

@Component({
  selector: 'reviews-form',
  standalone: true,
  imports: [ButtonModule, FormsModule, RatingModule],
  template: `
    <div style="padding-bottom:15px; width: 80vw;max-width: 600px">
      <p-rating [cancel]="false" [(ngModel)]="review.rating"></p-rating>
    </div>
    @if(review.rating){
    <div style="card flex justify-content-center;">
      <label for="float-input">write a review</label>
      <textarea
        id="float-input"
        rows="10"
        class="w-full mt-2"
        [(ngModel)]="review.review"
        pInputTextarea
      ></textarea>
    </div>
    }
    <div class="flex justify-content-between mt-2">
      <p-button
        label="Cancel"
        (click)="handleClick(review.userId, 'CANCEL')"
        styleClass="p-button-raised p-button-danger p-button-text mr-6"
        icon="pi pi-times"
      ></p-button>
      @if(review.review !==' ' && review.review !==''){<p-button
        label="Submit"
        severity="help"
        (click)="handleClick(review.userId)"
        icon="pi pi-check"
      ></p-button
      >}
    </div>
  `,
})
export class ReviewsFormComponent {
  @Input() review!: Review;
  @Output() onAction: any = new EventEmitter<any>();

  handleClick(id: string, action: null | string = null) {
    let formAction = null;
    if (!action) {
      formAction = id === '' ? 'save' : 'update';
    } else {
      formAction = action;
    }
    this.onAction.emit({ action: formAction, id, data: this.review });
  }
}
