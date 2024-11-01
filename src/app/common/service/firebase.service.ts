// import { Injectable } from '@angular/core';
// import { Firestore } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root',
// })
// export class FirebaseService {
//   constructor(private _firestore: Firestore) {}

//   private collectionRef(id?: any): CollectionReference {
//     const collectionName = id
//       ? `${COLLECTIONS.Transactions}/${id}`
//       : COLLECTIONS.Transactions;
//     return collection(this._firestore, collectionName);
//   }

//   private docRef(docId?: any): DocumentReference {
//     const collectionName = docId
//       ? `${COLLECTIONS.Transactions}/${docId}`
//       : COLLECTIONS.Transactions;
//     return doc(this._firestore, collectionName);
//   }
// }
