import { Injectable } from '@angular/core';
import { ICategory } from '../category.interface';
import { from, map, Observable } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { COLLECTIONS } from 'src/app/common/common.constants';
import { ConfigService } from 'src/app/common/service/config.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  userId = ConfigService.userId;

  constructor(private _firestore: Firestore) {}

  private collectionRef(id?: any): CollectionReference {
    const collectionName = id
      ? `${COLLECTIONS.Categories}/${id}`
      : COLLECTIONS.Categories;
    return collection(this._firestore, collectionName);
  }

  private docRef(docId?: any): DocumentReference {
    const collectionName = docId
      ? `${COLLECTIONS.Categories}/${docId}`
      : COLLECTIONS.Categories;
    return doc(this._firestore, collectionName);
  }

  getAllCategories(): Observable<any> {
    const categoryQuery = query(
      this.collectionRef(),
      where('userId', '==', this.userId)
    );
    return from(getDocs(categoryQuery)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      )
    );
  }

  createCategory(data: ICategory): Observable<any> {
    data.userId = this.userId;
    return from(
      addDoc(this.collectionRef(), {
        ...data,
        creationDate: new Date(),
        updatedDate: new Date(),
      })
    );
  }

  updateCategory(data: ICategory, id: string): Observable<any> {
    return from(
      updateDoc(this.docRef(id), { ...data, updatedDate: new Date() })
    );
  }

  deleteCategory(id: any): Observable<any> {
    // @TODO soft delete and hard delete
    return from(deleteDoc(this.docRef(id)));
  }
}
