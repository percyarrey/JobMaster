import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

//LAYOUT
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'JOBMASTER';

  isRoute(route: string | string[]): boolean {
    const routes = Array.isArray(route) ? route : [route];

    return routes.some((el) => {
      if (el === '') {
        return this.router.url.valueOf() === '/';
      } else {
        return this.router.url.startsWith('/' + el);
      }
    });
  }

  constructor(private router: Router) {}
}
