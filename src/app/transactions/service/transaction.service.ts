import { Injectable } from '@angular/core';
import { combineLatest, from, map, Observable, of } from 'rxjs';
import { ITransaction } from '../transactions.interface';
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { COLLECTIONS } from 'src/app/common/common.constants';
import { ConfigService } from 'src/app/common/service/config.service';
import { addDoc, deleteDoc, getDocs, updateDoc } from 'firebase/firestore';
import { ICategory } from 'src/app/category/category.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  userId = ConfigService.userId;

  constructor(private _firestore: Firestore) {}

  private collectionRef(id?: any): CollectionReference {
    const collectionName = id
      ? `${COLLECTIONS.Transactions}/${id}`
      : COLLECTIONS.Transactions;
    return collection(this._firestore, collectionName);
  }

  private docRef(docId?: any): DocumentReference {
    const collectionName = docId
      ? `${COLLECTIONS.Transactions}/${docId}`
      : COLLECTIONS.Transactions;
    return doc(this._firestore, collectionName);
  }

  getAllTransactions(): Observable<ITransaction[]> {
    const transactionRef = collection(
      this._firestore,
      COLLECTIONS.Transactions
    );
    const transactionQuery = query(
      transactionRef,
      where('userId', '==', this.userId)
    );
    const transactions$ = from(getDocs(transactionQuery)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      )
    );

    const categoryRef = collection(this._firestore, COLLECTIONS.Categories);
    const categoryQuery = query(
      categoryRef,
      where('userId', '==', this.userId)
    );
    const categories$ = from(getDocs(categoryQuery)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      )
    );

    return combineLatest([transactions$, categories$]).pipe(
      map(([transactions, categories]) => {
        return transactions.map((txn: any) => {
          const category: ICategory = categories.find(
            (p: any) => p.id === txn.categoryId
          ) as ICategory;
          return { ...txn, category };
        });
      })
    );
  }

  createTransaction(data: ITransaction): Observable<any> {
    data.userId = this.userId;
    return from(
      addDoc(this.collectionRef(), {
        ...data,
        creationDate: new Date(),
        updatedDate: new Date(),
      })
    ) as Observable<any>;
  }

  updateTransaction(data: ITransaction, id: any): Observable<any> {
    return from(
      updateDoc(this.docRef(id), { ...data, updatedDate: new Date() })
    ) as Observable<any>;
  }

  deleteTransaction(id: any): Observable<any> {
    return from(deleteDoc(this.docRef(id)));
  }
}
