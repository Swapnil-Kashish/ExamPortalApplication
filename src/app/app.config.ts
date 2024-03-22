import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {  authInterceptorProviders } from './services/auth.interceptor';




export const appConfig: ApplicationConfig = {
  providers: [authInterceptorProviders,provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),]
};
export { ApplicationConfig };

