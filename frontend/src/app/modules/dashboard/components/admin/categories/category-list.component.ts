import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ServiceCategory } from './interface/category';

@Component({
  selector: 'general-service-category-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    StyleClassModule,
    CheckboxModule,
    InputTextModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: ` <div>
    <div class="flex justify-content-between">
      <div class="flex">
        <div class="search">
          <span class="p-input-icon-left mr-0 mb-2">
            <i class="pi pi-search"></i>
            <input type="text" pInputText placeholder="search" />
          </span>
        </div>
      </div>
      <div>
        <p-button
          label="Add"
          icon="pi pi-plus"
          (click)="handleClick('create')"
          severity="help"
          styleClass=" mr-2 mb-2"
        ></p-button>
      </div>
    </div>
    <div class="mt-5">
      <p-table
        #dts
        dataKey="id"
        [rows]="10"
        [showCurrentPageReport]="true"
        [rowsPerPageOptions]="[10, 20]"
        [loading]="loading"
        [paginator]="true"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        [globalFilterFields]="['name', 'description.name', 'actions']"
        [value]="categories"
        [(selection)]="selectedCategories"
        dataKey="code"
        [style]="{ marginBottom: '100px' }"
        [tableStyle]="{ width: '100%', marginBottom: '50px' }"
      >
        <ng-template pTemplate="header">
          <tr>
            <th style="min-width: 1rem;">
              <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-category>
          <tr>
            <td>
              <p-tableCheckbox [value]="category"></p-tableCheckbox>
            </td>
            <td>{{ category.name }}</td>
            <td>{{ category.description }}</td>
            <td class="flex">
              <p-button
                label="Delete"
                icon="pi pi-fw pi-user-minus"
                (click)="handleClick('delete', category.id)"
                styleClass="p-button-rounded p-button-danger mr-2 mb-2"
              ></p-button>
              <p-button
                label="Edit"
                icon="pi pi-fw pi-pencil"
                (click)="handleClick('edit', category.id)"
                styleClass="p-button-rounded p-button-help mr-2 mb-2"
              ></p-button>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="5">No customers found.</td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  </div>`,
  styles: [
    `
      .search {
        margin-left: 10px;
      }
    `,
  ],
})
export class ServiceCategoryListComponent {
  storevalues: any = [];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const result = this.storevalues.filter((el: any) => {
      return el.name.toLowerCase().includes(filterValue.toLocaleLowerCase());
    });
    this.categories = result;
  }
  loading: boolean | undefined;
  matchMode: string = 'contains';
  constructor() {
    this.storevalues = this.categories;
  }

  @Input() categories!: ServiceCategory[];
  @Output() onAction: any = new EventEmitter<any>();
  selectedCategories!: ServiceCategory;

  handleClick(action: string, id: string | null = null) {
    this.onAction.emit({ action, id });
  }
}
