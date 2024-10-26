import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { GoogleAuthProvider } from 'firebase/auth';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //   afAuth = inject(AngularFireAuth);
  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private toaster: ToasterService
  ) {}

  loginWithEmail(email: string, pass: string) {
    if (email === 'akshay.shastrakar1@gmail.com' && pass === 'Akshay@1995') {
      sessionStorage.setItem('auth', '1');
      this.router.navigate(['/dashboard']);
    } else {
      sessionStorage.setItem('auth', '0');
      this.toaster.showError('Invalid Credentials');
    }
    // return this.afAuth.signInWithEmailAndPassword(email, pass);
  }

  loginWithGoogle() {
    // return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  createUser(email: string, pass: string) {
    // return this.afAuth.createUserWithEmailAndPassword(email, pass);
  }
}
