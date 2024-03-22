import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';


interface Category {
  // Adjust the properties based on the actual structure of your category data
  // For example:
  // categoryId: number;
  // categoryName: string;
  // ...
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  //load all the cateogries
  public categories() {
    return this.http.get(`${baseUrl}/category/`);
  }

  //add new category
  public addCategory(category: Category) {
    return this.http.post(`${baseUrl}/category/`, category);
  }
}
