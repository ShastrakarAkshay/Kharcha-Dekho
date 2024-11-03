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
  limit,
  orderBy,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { ICategory } from 'src/app/core/category/category.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private lastDoc: QueryDocumentSnapshot<any> | null = null;
  private firstDoc: QueryDocumentSnapshot<any> | null = null;

  constructor(
    private _firestore: Firestore,
    private _configService: ConfigService
  ) {}

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

  getFilteredQuery(collectionRef: CollectionReference, filters?: IFilter) {
    let transactionQuery = query(
      collectionRef,
      where('userId', '==', this._configService.userId),
      orderBy('createdAt', 'desc')
    );

    if (Number(filters?.month) >= 0) {
      const monthFilter: any = this.getCurrentMonth(Number(filters?.month));
      if (monthFilter?.startDate && monthFilter?.endDate) {
        transactionQuery = query(
          collectionRef,
          where('createdAt', '>=', monthFilter?.startDate),
          where('createdAt', '<=', monthFilter?.endDate),
          where('userId', '==', this._configService.userId)
        );
      }
    }

    if (filters?.categoryId) {
      transactionQuery = query(
        collectionRef,
        where('categoryId', '==', filters.categoryId),
        orderBy('createdAt', 'desc'),
        where('userId', '==', this._configService.userId)
      );
    }

    if (filters?.pageSize) {
      transactionQuery = query(
        collectionRef,
        orderBy('createdAt', 'desc'),
        where('userId', '==', this._configService.userId),
        limit(filters.pageSize)
      );

      if (this.lastDoc) {
        transactionQuery = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          where('userId', '==', this._configService.userId),
          limit(filters.pageSize),
          startAfter(this.lastDoc)
        );
      }
    }

    return transactionQuery;
  }

  getAllTransactions(filters?: IFilter): Observable<ITransaction[]> {
    const transactionRef = collection(
      this._firestore,
      COLLECTIONS.Transactions
    );

    const transactionQuery = this.getFilteredQuery(transactionRef, filters);

    const transactions$ = from(getDocs(transactionQuery)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          if (!snapshot.empty) {
            this.firstDoc = snapshot.docs[0];
            this.lastDoc = snapshot.docs[snapshot.docs.length - 1];
          }
          const data: any = doc.data();
          return { ...data, id: doc.id, createdAt: data.createdAt?.toDate() };
        })
      )
    );

    const categoryRef = collection(this._firestore, COLLECTIONS.Categories);
    const categoryQuery = query(
      categoryRef,
      where('userId', '==', this._configService.userId)
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
    return from(
      addDoc(this.collectionRef(), {
        ...data,
        userId: this._configService.userId,
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
