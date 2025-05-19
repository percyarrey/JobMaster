import { Component, EventEmitter, Input, Output } from "@angular/core";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ServiceDomain } from "../../types/ServiceDomain";

@Component({
    selector: 'general-service-domain-form',
    standalone: true,
    imports: [
      FormsModule,
      ButtonModule,
      InputTextareaModule,
      InputTextModule
    ],
    template: `
    <div>
      
      <div>
          <div>
            <span class="p-float-label">
            <input pInputText id="name" type="text" class="p-inputtext-lg" placeholder="Name" [(ngModel)]="domain.name" />
                <label for="name">Name</label>
            </span>
              
          </div>
          <div>
              <span class="p-float-label">
                  <textarea id="float-input" rows="5" cols="30" [(ngModel)]="domain.description" pInputTextarea></textarea>
                  <label for="float-input">Summary</label>
              </span>
          </div>
          <div>
              <p-button label="Submit" (click)="handleClick(domain.id)"></p-button>
          </div>
      </div>
    </div>`,
    styles: [`
    
    `]
  })
  export class ServiceDomainFormComponent { 
    
    @Input() domain!: ServiceDomain;
    @Output() onAction: any = new EventEmitter<any>();
    
    constructor() {}

    handleClick(id: string) {
      const action = id === '' ? 'save' : 'update';
      this.onAction.emit({action, id, data: this.domain});
    }
  
  }