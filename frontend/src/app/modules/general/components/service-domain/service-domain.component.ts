import { Component } from "@angular/core";
import { ServiceDomain } from "../../types/ServiceDomain";
import { ServiceDomainListComponent } from "./service-domain-list.component";
import { DialogModule } from 'primeng/dialog';
import { ServiceDomainFormComponent } from "./service-domain-form.component";


@Component({
    selector: 'general-service-domain',
    standalone: true,
    imports: [
      DialogModule,
      ServiceDomainListComponent,
      ServiceDomainFormComponent
    ],
    template: `<div>
      
      <general-service-domain-list
        [domains]="domains"
        (onAction)="handleAction($event)"
      ></general-service-domain-list>
      <p-dialog header="Service Domain Form" [(visible)]="dialogVisible" [style]="{ width: '50vw' }">
          <general-service-domain-form
            [domain]="domain"
            (onAction)="handleAction($event)"
          ></general-service-domain-form>
      </p-dialog>
    </div>`,
    styles: [`
    
    `]
  })
  export class ServiceDomainComponent { 
    dialogVisible: boolean = false;
    initDomain: ServiceDomain = {
      id: '',
      name: '',
      thumbnail: ' ',
      description: ''
    };
    domain: ServiceDomain = {
      id: '',
      name: '',
      thumbnail: ' ',
      description: ''
    };
    domains: ServiceDomain[] = [
      {
        id: '1',
        name: 'Mechanics',
        thumbnail: ' ',
        description: ''
      },
      {
        id: '2',
        name: 'Electricity',
        thumbnail: ' ',
        description: ''
      },
      {
        id: '3',
        name: 'Web Design',
        thumbnail: ' ',
        description: ''
      },
      {
        id: '4',
        name: 'Construction',
        thumbnail: ' ',
        description: ''
      },
      {
        id: '5',
        name: 'Wood work',
        thumbnail: ' ',
        description: ''
      }
    ]
    constructor() {}

    showDialog() {
      this.dialogVisible = true;
    }

    handleAction(event: any) {
      switch(event.action) {
        case 'create':
          this.domain = this.initDomain;
          this.showDialog()
          break;
        case 'save':
          const list = this.domains;
          list.push(event.data); 
          this.domains = [...list];
          break;
        case 'edit':
          this.domain = this.domains.find((obj) => obj.id === event.id) || this.initDomain
          this.showDialog()
          break;
        case 'update':
          const items = this.domains;
          const selected = this.domains.find((obj: any) => obj.id ===  event.id) || this.initDomain;
          items[items.indexOf(selected)] = event.data;
          this.domains = [...items];
          this.dialogVisible = false;
          break;
        default:
          console.log({event}) 
          
        ;
      }
    }
  
  }