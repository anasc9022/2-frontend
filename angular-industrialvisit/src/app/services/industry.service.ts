import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IndustrialCategory } from '../common/industrial-category';
import { Industry } from '../common/industry';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  private baseUrl = 'http://localhost:8080/api/industries';

  private categoryUrl = 'http://localhost:8080/api/industrial-category';

  constructor(private httpClient: HttpClient) { }

  getIndustry(theIndustryId: number): Observable<Industry> {
    
    //bild Url based on industry id
    const industryUrl = `${this.baseUrl}/${theIndustryId}`;

    return this.httpClient.get<Industry>(industryUrl);
  }

  getIndustryList(theCategoryId: number): Observable<Industry[]> {

    //build url based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseIndustries>(searchUrl).pipe(
      map(response => response._embedded.industries)
    );
  }

  searchIndustries(theKeyword: string): Observable<Industry[]> {

    //build url based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.httpClient.get<GetResponseIndustries>(searchUrl).pipe(
      map(response => response._embedded.industries)
    );
  }

  getIndustrialCategories(): Observable<IndustrialCategory[]> {

    return this.httpClient.get<GetResponseIndustrialCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.industrialCategory)
    );
  }

}

interface GetResponseIndustries {
  _embedded: {
    industries: Industry[];
  }
}

interface GetResponseIndustrialCategory {
  _embedded: {
    industrialCategory: IndustrialCategory[];
  }
}
