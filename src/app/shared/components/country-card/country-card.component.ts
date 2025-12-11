import { Component, Input } from '@angular/core';
import { Country } from '../../../core/models/country-model';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [MatCardModule, RouterModule],
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent {
  @Input() country!: Country;
}
