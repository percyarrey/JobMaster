import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, private router: Router) {}

  /* GET SUGGESTION */
  getSuggestions(type: string): string[] {
    const results: string[] = [];

    const data$: Observable<string[]> = this.http.get<string[]>(
      type !== 'country'
        ? './assets/serviceSuggestionData.json'
        : './assets/countrySuggestionData.json'
    );
    data$.subscribe((data: any) => {
      for (const item of data) {
        results.push(item);
      }
    });
    return results;
  }
}
