import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../../core/services/countries.service';
import { Country } from '../../core/models/country-model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  countries: Country[] = [];
  filtered: Country[] = [];
  search = '';

  constructor(private svc: CountriesService) { }

  ngOnInit(): void {
    this.svc.getAll().subscribe(data => {
      this.countries = data;
      this.filtered = data;
    });
  }

  filter() {
    this.filtered = this.countries.filter(c =>
      c.name.common.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
