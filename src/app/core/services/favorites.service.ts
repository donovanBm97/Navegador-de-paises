import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc, deleteDoc, collectionData } from '@angular/fire/firestore';
import { Country } from '../models/country-model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {

  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'favorites');

  getFavorites(): Observable<Country[]> {
    return collectionData(this.col, { idField: 'cca3' }) as Observable<Country[]>;
  }

  addFavorite(country: Country) {
    return setDoc(doc(this.col, country.cca3), country);
  }

  removeFavorite(code: string) {
    return deleteDoc(doc(this.col, code));
  }
}
