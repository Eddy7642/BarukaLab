import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Category } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseurl = "https://localhost:7136/api/Shopping/";

  constructor(private http: HttpClient) {}

  getCategoryList() {
    let url = this.baseurl + 'GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories) =>
        categories.map((category) => {
          let mappedCategory: Category = {
            id: category.id,
            category: category.category,
            subcategory: category.subCategory,
          };
          return mappedCategory;
        })
      )
    );
  }
}
