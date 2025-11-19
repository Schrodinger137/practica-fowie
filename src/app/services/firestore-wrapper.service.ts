import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreWrapperService {

  constructor(private firestore: Firestore) {}

  col(path: string) {
    return collection(this.firestore, path);
  }

  colData(ref: any) {
    return collectionData(ref, { idField: 'id' });
  }

  doc(path: string) {
    return doc(this.firestore, path);
  }

  docData(ref: any) {
    return docData(ref);
  }
}
