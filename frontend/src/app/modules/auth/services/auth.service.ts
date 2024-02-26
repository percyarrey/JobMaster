import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jsonData: string[] = [];

  constructor(private http: HttpClient) {
    this.http
      .get<string[]>('./assets/suggestionData.json')
      .subscribe((data) => {
        this.jsonData = data;
      });
  }

  /* GET SUGGESTION */
  getSuggestions(query: string): string[] {
    const results: string[] = [];
    const normalizedQuery = query.toLowerCase();

    for (const item of this.jsonData) {
      const normalizedItem = item.toLowerCase();
      if (normalizedItem.startsWith(normalizedQuery)) {
        results.push(item);
        if (results.length === 5) {
          break; // Break the loop if 5 suggestions are found
        }
      }
    }

    /* if (results.length === 0) {
      for (const item of this.jsonData) {
        const normalizedItem = item.toLowerCase();
        if (normalizedItem.includes(normalizedQuery)) {
          results.push(item);
          if (results.length >= 5) {
            break; // Break the loop if 5 suggestions are found
          }
        }
      }
    } */

    return results;
  }
}
