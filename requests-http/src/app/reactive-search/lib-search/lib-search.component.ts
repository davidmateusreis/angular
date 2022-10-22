import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$!: Observable<any>;
  total!: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSearch() {
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;

    if (value && (value = value.trim()) !== '') {

      const params = {
        search: value,
        fields: fields
      };

      let params_ = new HttpParams();
      params_ = params_.set('search', value);
      params_ = params_.set('fields', fields);

      this.results$ = this.http.get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => this.total = res.total),
          map(res => res.results)
        );
    }
  }

}
