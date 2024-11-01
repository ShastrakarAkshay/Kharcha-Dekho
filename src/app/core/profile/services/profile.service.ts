import { Injectable } from '@angular/core';
import {
  CollectionReference,
  collection,
  DocumentReference,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { COLLECTIONS } from 'src/app/common/common.constants';
import { ConfigService } from 'src/app/common/service/config.service';
import { IUser } from '../profile.interface';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private _firestore: Firestore,
    private _configService: ConfigService
  ) {}

  private collectionRef(id?: any): CollectionReference {
    const collectionName = id
      ? `${COLLECTIONS.Users}/${id}`
      : COLLECTIONS.Users;
    return collection(this._firestore, collectionName);
  }

  private docRef(docId?: any): DocumentReference {
    const collectionName = docId
      ? `${COLLECTIONS.Users}/${docId}`
      : COLLECTIONS.Users;
    return doc(this._firestore, collectionName);
  }

  getAccountInfo(): Observable<any> {
    return from(getDoc(this.docRef(this._configService.userId))).pipe(
      map((snapshot) => snapshot.data())
    );
  }

  updateProfileInfo(data: IUser): Observable<any> {
    return from(setDoc(this.docRef(this._configService.userId), data));
  }
}
