import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrl: './getting-started.component.scss',
})
export class GettingStartedComponent {
  name: string = 'Your_Name';
  activeIndex: any = 0;
  constructor() {
    /* setInterval(() => {
      console.log(this.activeIndex);
    }, 1000); */
  }

  activeIndexChange = (value: any) => {
    this.activeIndex = value;
  };
}
