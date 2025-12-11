import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { Country } from '../models/country-model';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private url = 'https://restcountries.com/v3.1/all?fields=name,cca3,region,languages,population,area,flags';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url).pipe(shareReplay(1));
  }
}
