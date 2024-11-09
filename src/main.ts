import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTES } from './router.config';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAuth, getAuth, AuthModule } from '@angular/fire/auth';
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
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ConfirmDialogComponent } from './app/common/components/confirm-dialog/confirm-dialog.component';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule, provideStore } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TransactionState } from './app/store/states/transaction.state';
import { CategoryState } from './app/store/states/category.state';

export const firebaseConfig = {
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
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
    provideRouter(ROUTES, withComponentInputBinding()),
    importProvidersFrom(
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      MatSnackBarModule,
      MatDialogModule,
      FirebaseAppModule,
      FirestoreModule,
      AuthModule,
      AngularFireModule,
      AngularFireAuthModule,
      NgxsModule,
      NgxsLoggerPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot()
    ),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStore([TransactionState, CategoryState]),
    ConfirmDialogComponent,
  ],
}).catch((err) => console.log(err));
