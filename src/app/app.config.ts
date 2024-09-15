import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      HttpClientModule
    ),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {

        const iconRegistry = inject(MatIconRegistry),
          sanitizer = inject(DomSanitizer);

        const iconPath = 'assets/icons/',
          svg_icons = [
            'dark_mode',
            'light_mode',
          ];

        svg_icons.forEach(icon => {
          iconRegistry.addSvgIcon(icon, sanitizer.bypassSecurityTrustResourceUrl(`${iconPath}${icon}.svg`));
        });

        return () => Promise.resolve();
      },
      multi: true
    },
    MatIconRegistry
  ]
};
