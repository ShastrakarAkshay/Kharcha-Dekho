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
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { COLLECTIONS } from 'src/app/common/common.constants';
import { ConfigService } from 'src/app/common/service/config.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  userId: string;

  constructor(
    private _firestore: Firestore,
    private _configService: ConfigService
  ) {
    this.userId = this._configService.userId;
  }

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

  private async isCategoryExist(id: string) {
    const collectionRef = collection(this._firestore, COLLECTIONS.Transactions);
    const q = query(collectionRef, where('categoryId', '==', id));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  getAllCategories(): Observable<any> {
    const categoryQuery = query(
      this.collectionRef(),
      where('userId', '==', this.userId),
      where('active', '==', true),
      orderBy('name', 'asc')
    );
    return from(getDocs(categoryQuery)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      )
    );
  }

  createCategory(data: ICategory): Observable<any> {
    return from(
      addDoc(this.collectionRef(), {
        ...data,
        active: true,
        userId: this.userId,
        creationDate: Timestamp.fromDate(new Date()),
        updatedDate: Timestamp.fromDate(new Date()),
      })
    );
  }

  updateCategory(data: ICategory, id: string): Observable<any> {
    return from(
      updateDoc(this.docRef(id), {
        ...data,
        updatedDate: Timestamp.fromDate(new Date()),
      })
    );
  }

  async deleteCategory(id: any): Promise<any> {
    const isExist = await this.isCategoryExist(id);
    if (isExist) {
      return updateDoc(this.docRef(id), { active: false });
    } else {
      return deleteDoc(this.docRef(id));
    }
  }
}
