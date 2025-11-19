import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { RespuestaBD, RespuestaDetalle } from '../interfaces/interfaces';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class Personajes {

  constructor( private firestore: Firestore) { }

  // getDatos() {
  //   return this.http.get<RespuestaBD>('https://ionic-angular26-default-rtdb.firebaseio.com/.json');
  // }

  // getPersonajeById(id: string) {
  //   return this.http.get<RespuestaDetalle>(
  //     `https://ionic-angular26-default-rtdb.firebaseio.com/data/${id}.json`
  //   );
  // }


  getPersonajes() {
    const personajesRef = collection(this.firestore, 'personajes');
    return collectionData(personajesRef, { idField: 'id' });
  }

  getPersonajesDetalle(id: string) {
    const personajeRef = doc(this.firestore, `personajes/${id}`)
    return docData(personajeRef)
  }
}


