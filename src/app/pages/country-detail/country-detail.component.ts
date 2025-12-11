import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { CountriesService } from '../../core/services/countries.service';
import { SimilarityService } from '../../core/services/similarity.service';
import { explainSimilarity } from '../../core/services/similarity-explainer';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Country } from '../../core/models/country-model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  loading = true;
  error: string | null = null;

  country: Country | null = null;
  similars: Country[] = [];
  explanations: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private countriesSvc: CountriesService,
    private similaritySvc: SimilarityService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.countriesSvc.getAll().subscribe({
      next: (all) => {
        const cleanList = all.filter(c => c && c.cca3);
        this.country = cleanList.find(
          c => c.cca3.toLowerCase() === id.toLowerCase()
        ) ?? null;

        if (!this.country) {
          this.error = "No se encontró el país solicitado.";
          this.loading = false;
          return;
        }

        // Similaridad
        this.similars = this.similaritySvc.getTopSimilar(this.country, cleanList);
        this.explanations = this.similars.map(s =>
          explainSimilarity(this.country!, s)
        );

        this.loading = false;
      },
      error: () => {
        this.error = "Error al cargar datos.";
        this.loading = false;
      }
    });
  }
}
