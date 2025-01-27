import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "./core/interceptors/auth.interceptor";
import { InitService } from "./core/services/init.service";
import { lastValueFrom } from "rxjs";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loadingInterceptor } from "./core/interceptors/loading.interceptor";

function initApp(initService:InitService){
    return () => lastValueFrom(initService.init());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(
        withInterceptors([
            authInterceptor,
            loadingInterceptor,
        ])
    ),
    {
        provide:APP_INITIALIZER,
        useFactory:initApp,
        multi:true,
        deps:[InitService],
    }, provideAnimationsAsync()
  ]
};
