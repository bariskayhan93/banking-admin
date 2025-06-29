import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, LOCALE_ID } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAuth0, authHttpInterceptorFn } from '@auth0/auth0-angular';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

registerLocaleData(localeDE);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'de-DE' },
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri,
        audience: environment.auth0.audience,
        scope: 'openid profile email'
      },
      httpInterceptor: {
        allowedList: [`${environment.apiBaseUrl}/*`]
      }
    })
  ]
};
