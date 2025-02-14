import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app/app.routes';
import { AuthGuard } from './app/guards/auth.guard';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), AuthGuard],
}).catch((err) => console.error(err));
