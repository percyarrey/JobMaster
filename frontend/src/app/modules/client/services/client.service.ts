import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private remoteJobsUrl = 'https://remotive.com/api/remote-jobs';
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

  /* GET COMPANIES*/
  getCompany(): Observable<any> {
    return this.http.get<string[]>(`${environment.backendUrl}companies`);
  }
  getCompanyDetails(id: string | null): Observable<any> {
    return this.http.get<string[]>(`${environment.backendUrl}companies/${id}`);
  }
  /* GET JOBS*/
  getJobs(
    query: string,
    first: number,
    items: number,
    country: string
  ): Observable<any> {
    let params = new HttpParams();
    if (query) {
      params = params.set('query', query);
    }
    if (first) {
      params = params.set('first', first.toString());
    }
    if (items) {
      params = params.set('items', items.toString());
    }
    if (country) {
      params = params.set('country', country);
    }

    return this.http.get<any[]>(`${environment.backendUrl}jobs`, { params });
  }
  /* JOBS DETAILS */
  getJobDetails(id: string | null): Observable<any> {
    return this.http.get<string[]>(
      `${environment.backendUrl}jobs/findjob/${id}`
    );
  }
  /* JOBS DETAILS */
  getJobByCompany(id: string | null): Observable<any> {
    return this.http.get<string[]>(
      `${environment.backendUrl}jobs/findjobbycompany/${id}`
    );
  }

  /* DELETE JOB */
  deleteJob(id: Number) {
    return this.http.delete(`${environment.backendUrl}jobs/${id}`);
  }
}
