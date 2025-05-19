import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServiceCategory } from './interface/category';

@Component({
  selector: 'general-service-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class ServiceCategoryComponent {
  dialogVisible: boolean = false;
  initCategory: ServiceCategory = {
    id: '',
    name: '',
    description: '',
  };
  category: ServiceCategory = {
    id: '',
    name: '',
    description: '',
  };
  categories: ServiceCategory[] = [
    {
      id: '1',
      name: 'Mechanics',
      description: '',
    },
    {
      id: '2',
      name: 'Electricity',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
    },
    {
      id: '3',
      name: 'plumber',
      description: 'lorem62 dolor sit amet, consectet',
    },
    {
      id: '4',
      name: 'Cleaner',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing',
    },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  showDialog() {
    this.dialogVisible = true;
  }

  handleAction(event: any) {
    switch (event.action) {
      case 'create':
        this.category = this.initCategory;
        this.showDialog();
        break;
      case 'save':
        const list = this.categories;
        list.push(event.data);
        this.categories = [...list];
        break;
      case 'edit':
        this.category =
          this.categories.find((obj) => obj.id === event.id) ||
          this.initCategory;
        this.showDialog();
        break;
      case 'update':
        const items = this.categories;
        const selected =
          this.categories.find((obj: any) => obj.id === event.id) ||
          this.initCategory;
        items[items.indexOf(selected)] = event.data;
        this.categories = [...items];
        this.dialogVisible = false;
        break;
      case 'delete':
        this.confirm(event);
        console.log(event.id);
        break;
      default:
        console.log({ event });
    }
  }
  confirm(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Please confirm to proceed Delete.',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      rejectButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-help p-button-sm',
      accept: () => {
        this.deleteService(event.id);
        // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
  deleteService(id: any) {
    this.categories = this.categories.filter((obj) => obj.id !== id);
    this.messageService.add({
      severity: 'info',
      summary: 'Confirmed',
      detail: 'You have accepted',
      life: 3000,
    });
  }
}
