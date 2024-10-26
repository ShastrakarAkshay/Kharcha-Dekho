import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  afAuth = inject(AngularFireAuth);
  constructor(private router: Router, private spinner: SpinnerService) {}

  loginWithEmail(email: string, pass: string) {
    return this.afAuth.signInWithEmailAndPassword(email, pass);
  }

  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  createUser(email: string, pass: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, pass);
  }
}
