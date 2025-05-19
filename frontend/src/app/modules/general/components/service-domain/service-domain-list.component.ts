import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ServiceDomain } from "../../types/ServiceDomain";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'general-service-domain-list',
    standalone: true,
    imports: [TableModule, ButtonModule],
    template: `
    <div>
      <h3>Service Domains</h3>
      <div class="table-nav">
        <div>Total: {{domains.length}}</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div>
          <p-button label="Add" (click)="handleClick('create')"></p-button>
        </div>
      </div>
      <div class="card">
          <p-table [value]="domains" [(selection)]="selectedDomains" dataKey="code" [tableStyle]="{'min-width': '50rem'}">
              <ng-template pTemplate="header">
                  <tr>
                      <th style="width: 4rem">
                          <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                      </th>
                      <th>Name</th>
                      <th>Thumbnail</th>
                      <th>Actions</th>
                  </tr>
              </ng-template>
              <ng-template pTemplate="body" let-domain>
                  <tr>
                      <td>
                          <p-tableCheckbox [value]="domain"></p-tableCheckbox>
                      </td>
                      <td>{{domain.name}}</td>
                      <td>{{domain.thumbnail}}</td>
                      
                      <td>
                        <p-button label="Delete" (click)="handleClick('delete', domain.id)"></p-button>
                        <p-button label="Edit" (click)="handleClick('edit', domain.id)"></p-button>
                      </td>
                  </tr>
              </ng-template>
          </p-table>
      </div>
    </div>`,
    styles: [`
      .table-nav {
        display: flex;
        flex-direction: row;
      }
      .table-nav > div:nth-child(3) {
        flex-grow: 1;
      }
    `]
  })
  export class ServiceDomainListComponent { 
    @Input() domains: ServiceDomain[] = [];
    @Output() onAction: any = new EventEmitter<any>();

    selectedDomains!: ServiceDomain;

    constructor() {}

    handleClick(action: string, id: string | null = null) {
      this.onAction.emit({action, id});
    }
  
  }