import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, Observable, of, tap } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';
import { ConfigService } from './config.service';
import { Store } from '@ngxs/store';
import { TransactionState } from 'src/app/store/states/transaction.state';
import { CategoryState } from 'src/app/store/states/category.state';
import { DashboardTransactionState } from 'src/app/store/states/dashboard.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private store: Store) {}

  async getUid() {
    const user = await this.afAuth.currentUser;
    if (user) {
      return user.uid;
    }
    return null;
  }

  loginWithEmail(email: string, pass: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, pass)).pipe(
      tap(() => {
        localStorage.removeItem('uid');
        this.resetAllStates();
      })
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
    return from(this.afAuth.signOut()).pipe(
      tap(() => {
        this.resetAllStates();
        localStorage.clear();
      })
    );
  }

  resetPassword(email: string) {
    return from(this.afAuth.sendPasswordResetEmail(email));
  }

  resetAllStates() {
    const states = [TransactionState, CategoryState, DashboardTransactionState];
    states.forEach((state) => this.store.reset(state));
  }
}
