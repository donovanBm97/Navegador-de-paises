import { Injectable } from '@angular/core';
import { Country } from '../models/country-model';

@Injectable({ providedIn: 'root' })
export class SimilarityService {

  computeSimilarity(a: Country, b: Country): number {
    const pop = this.scale(a.population - b.population);
    const area = this.scale(a.area - b.area);
    const region = a.region === b.region ? 0 : 1;

    const langsA = Object.keys(a.languages ?? {}).length;
    const langsB = Object.keys(b.languages ?? {}).length;
    const langs = Math.abs(langsA - langsB) / 10;

    return pop + area + region + langs;
  }

  private scale(value: number) {
    return Math.abs(value) / 1_000_000_000;
  }

  getTopSimilar(target: Country, list: Country[]): Country[] {

    if (!target) return [];

    return list
      .filter(c => c && c.cca3) // ← limpiar undefined + países inválidos
      .filter(c => c.cca3 !== target.cca3)
      .map(c => ({
        country: c,
        score: this.computeSimilarity(target, c)
      }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)
      .map(x => x.country);
  }

}
