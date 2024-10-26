import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { ROUTES } from './router.config';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAuth, getAuth, AuthModule } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import {
  provideFirebaseApp,
  initializeApp,
  FirebaseAppModule,
} from '@angular/fire/app';
import {
  provideFirestore,
  getFirestore,
  FirestoreModule,
} from '@angular/fire/firestore';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { ConfirmDialogComponent } from './app/common/components/confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './app/login/login.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from './app/common/service/auth.service';
import { AUTH_PROVIDER_NAME } from '@angular/fire/auth/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBCewB9DeINEAHb4xI7V8Rezzmb1HQtv2w',
  authDomain: 'kharcha-dekho.firebaseapp.com',
  projectId: 'kharcha-dekho',
  storageBucket: 'kharcha-dekho.appspot.com',
  messagingSenderId: '479825737854',
  appId: '1:479825737854:web:56f8e06cea57b17486002f',
  measurementId: 'G-C6WG9Y9Y41',
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    importProvidersFrom(
      BrowserAnimationsModule,
      MatSnackBarModule,
      MatDialogModule,
      FirebaseAppModule,
      FirestoreModule,
      AuthModule,
      AngularFireModule,
      AngularFireAuthModule,
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth())
    ),
    ConfirmDialogComponent,
    LoginComponent,
  ],
}).catch((err) => console.log(err));
