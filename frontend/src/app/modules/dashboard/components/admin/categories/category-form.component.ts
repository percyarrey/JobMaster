import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ServiceCategory } from './interface/category';

@Component({
  selector: 'general-service-category-form',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextareaModule, InputTextModule],
  template: ` <div>
    <div>
      <div>
        <span class="p-float-label">
          <input
            pInputText
            id="name"
            type="text"
            class="p-inputtext-lg"
            placeholder="Name"
            [(ngModel)]="category.name"
          />
          <label for="name">Name</label>
        </span>
      </div>
      <div>
        <span class="p-float-label" style="margin-top: 20px;">
          <textarea
            id="float-input"
            rows="5"
            class="w-full"
            [(ngModel)]="category.description"
            pInputTextarea
          ></textarea>
          <label for="float-input">Summary</label>
        </span>
      </div>
      <div class="flex justify-content-end mt-2">
        <p-button
          label="Submit"
          (click)="handleClick(category.id)"
          styleClass="p-button-raised p-button-help p-button-text mr-2 mb-2"
        ></p-button>
      </div>
    </div>
  </div>`,
  styles: [``],
})
export class ServiceCategoryFormComponent {
  @Input() category!: ServiceCategory;
  @Output() onAction: any = new EventEmitter<any>();

  constructor() {}

  handleClick(id: string) {
    const action = id === '' ? 'save' : 'update';
    this.onAction.emit({ action, id, data: this.category });
  }
}
