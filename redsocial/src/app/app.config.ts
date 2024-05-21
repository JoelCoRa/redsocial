import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { addTokenInterceptor } from './utils/add-token.interceptor';
// import { addTokenInterceptor } from './utils/add-token.interceptor';
// import { addTokenInterceptor } from './utils/add-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    // provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([addTokenInterceptor]), withFetch()),
    // {provide: LOCALE_ID, useValue: 'es' }
  ]
};
