import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { firebaseApp, auth } from './app/app.config'; // Importing from app.config

// Bootstrap the application
bootstrapApplication(AppComponent)
  .then(() => {
    console.log('Application bootstrapped');
  })
  .catch((error) => {
    console.error('Bootstrap failed', error);
  });
