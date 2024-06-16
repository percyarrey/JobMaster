import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideStore } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimations(),
    provideStore(reducers, { metaReducers }),
    
  ],
};
