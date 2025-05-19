import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceProviderService {
  constructor(private http: HttpClient) {}

  /* GET SUGGESTION */
  getSuggestions(): string[] {
    const results: string[] = [];

    try {
      const data$: Observable<string[]> = this.http.get<string[]>(
        './assets/countrySuggestionData.json'
      );
      data$.subscribe((data: any) => {
        for (const item of data) {
          results.push(item);
        }
      });
    } catch (error) {}
    return results;
  }

  /* GET SUBSCRIPTION DATA */
  getSubscriptionData(): Observable<any> {
    return this.http.get('./assets/subscriptionData.json');
  }

  /* SAVE PROFILE*/
  saveProfile(data: any): Observable<any> {
    return this.http.get<string[]>('./assets/countrySuggestionData.json');
  }

  /* SAVE PROFILE*/
  saveService(data: any): Observable<any> {
    return this.http.get<string[]>('./assets/countrySuggestionData.json');
  }
}
