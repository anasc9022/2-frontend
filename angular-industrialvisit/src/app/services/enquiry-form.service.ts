import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../common/country';
import { Industry } from '../common/industry';
import { RegisterDetails } from '../common/register-details';
import { State } from '../common/state';
import { Visitor } from '../common/visitor';
import { VisitorDetail } from '../common/visitor-detail';
import { AdminComponent } from '../components/admin/admin.component';

@Injectable({
  providedIn: 'root'
})
export class EnquiryFormService {

  private countriesUrl = 'http://localhost:8080/api/countries';

  private statesUrl = 'http://localhost:8080/api/states';

  private EnquiryUrl = 'http://localhost:8080/api/enquiry/save';
  
  private registerUrl = 'http://localhost:8080/api/register/save';

  private industryUrl = 'http://localhost:8080/api/industry/save';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {

    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  saveVisitor(visitor: Visitor): Observable<any> {
    return this.httpClient.post<VisitorDetail>(this.EnquiryUrl, visitor)
  }

  saveRegister(visitor: Visitor): Observable<any> {
    return this.httpClient.post<RegisterDetails>(this.registerUrl, visitor)
  }

 // formData = this.adminComponent.formData;

  saveIndustry(formData :any): Observable<any> {
    return this.httpClient.post<any>(this.industryUrl, formData)
  }
 
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}