import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private configService: ConfigService
  ) {
    this.setUserUid();
  }

  setUserUid() {
    this.afAuth.authState.subscribe((user) => {
      this.configService.userId = user?.uid || '';
    });
  }

  loginWithEmail(email: string, pass: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, pass));
  }

  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  createUser(email: string, pass: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, pass);
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user) => !!user));
  }

  logout() {
    this.afAuth.signOut();
  }
}
