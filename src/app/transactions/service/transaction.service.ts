import { Injectable } from '@angular/core';
import { combineLatest, from, map, Observable, of } from 'rxjs';
import { IFilter, ITransaction } from '../transactions.interface';
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
import {
  addDoc,
  deleteDoc,
  getDocs,
  orderBy,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
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

  private getCurrentMonth(month: number) {
    if (month >= 0) {
      const year = new Date().getFullYear();
      const firstDay = new Date(year, month, 1).getDate();
      const lastDay = new Date(year, month + 1, 0).getDate();

      const startDate = Timestamp.fromDate(new Date(year, month, firstDay));
      const endDate = Timestamp.fromDate(
        new Date(year, month, lastDay, 23, 59, 59)
      );
      return { startDate, endDate };
    }
    return { startDate: null, endDate: null };
  }

  getAllTransactions(filters?: IFilter): Observable<ITransaction[]> {
    const transactionRef = collection(
      this._firestore,
      COLLECTIONS.Transactions
    );
    let transactionQuery = query(
      transactionRef,
      where('userId', '==', this.userId),
      orderBy('createdAt', 'desc')
    );

    if (filters?.month) {
      const monthFilter: any = this.getCurrentMonth(filters.month);
      if (monthFilter?.startDate && monthFilter?.endDate) {
        transactionQuery = query(
          transactionRef,
          where('createdAt', '>=', monthFilter?.startDate),
          where('createdAt', '<=', monthFilter?.endDate)
        );
      }
    }

    if (filters?.categoryId) {
      transactionQuery = query(
        transactionRef,
        where('categoryId', '==', filters.categoryId),
        orderBy('createdAt', 'desc')
      );
    }

    const transactions$ = from(getDocs(transactionQuery)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          const data: any = doc.data();
          return { ...data, id: doc.id, createdAt: data.createdAt?.toDate() };
        })
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
        createdAt: Timestamp.fromDate(data.createdAt),
        updatedAt: Timestamp.now(),
      })
    ) as Observable<any>;
  }

  updateTransaction(data: ITransaction, id: any): Observable<any> {
    return from(
      updateDoc(this.docRef(id), {
        ...data,
        updatedAt: Timestamp.now(),
        createdAt: Timestamp.fromDate(data.createdAt),
      })
    ) as Observable<any>;
  }

  deleteTransaction(id: any): Observable<any> {
    return from(deleteDoc(this.docRef(id)));
  }
}
