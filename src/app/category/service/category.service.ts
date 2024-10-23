import { Injectable } from '@angular/core';
import { ICategory } from '../category.interface';
import { from, Observable } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
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

  getAllCategories(): Observable<ICategory[]> {
    const q = query(this.collectionRef(), where('userId', '==', this.userId));
    return collectionData(q, { idField: 'id' }) as Observable<ICategory[]>;
  }

  createCategory(data: ICategory): Observable<any> {
    data.userId = this.userId;
    return from(addDoc(this.collectionRef(), data));
  }

  updateCategory(data: ICategory, id: string): Observable<any> {
    return from(updateDoc(this.docRef(id), data as any));
  }

  deleteCategory(id: any): Observable<any> {
    return from(deleteDoc(this.docRef(id)));
  }
}
