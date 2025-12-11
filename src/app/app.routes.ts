import { Routes } from '@angular/router';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'country/:id', component: CountryDetailComponent },
    { path: '**', redirectTo: '' }
];
