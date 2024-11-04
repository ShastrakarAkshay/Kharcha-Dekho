import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable, of, tap } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async getUid() {
    const user = await this.afAuth.currentUser;
    if (user) {
      return user.uid;
    }
    return null;
  }

  loginWithEmail(email: string, pass: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, pass)).pipe(
      tap(() => localStorage.removeItem('uid'))
    );
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
    return from(this.afAuth.signOut()).pipe(tap(() => localStorage.clear()));
  }

  resetPassword(email: string) {
    return from(this.afAuth.sendPasswordResetEmail(email));
  }
}
