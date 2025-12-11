import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../../core/services/countries.service';
import { Country } from '../../core/models/country-model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
    MatButtonModule,
    MatPaginatorModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  countries: Country[] = [];
  filtered: Country[] = []; 
  paged: Country[] = [];    
  search = '';
  pageSize = 20;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private svc: CountriesService) { }

  ngOnInit(): void {
    this.svc.getAll().subscribe(data => {
      this.countries = data;
      this.filtered = data;
      this.updatePagedData();
    });
  }

  filter() {
    this.filtered = this.countries.filter(c =>
      c.name.common.toLowerCase().includes(this.search.toLowerCase())
    );

    this.currentPage = 0;
    if (this.paginator) this.paginator.firstPage();

    this.updatePagedData();
  }

  updatePagedData() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paged = this.filtered.slice(start, end);
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedData();
  }
}
