import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SubscriptionPlan } from '../interface/subscription';

const subscriptions: SubscriptionPlan[] = [
  {
    adminId: 'admin-01',
    planName: 'Business-subscription',
    duration: '4months',
    cost: '25000',
    createdAt: '2nd March',
    updatedAt: '2nd March',
  },
  {
    adminId: 'admin-02',
    planName: 'tech-subscription',
    duration: '2days',
    cost: '2500',
    createdAt: 'August 8',
    updatedAt: 'August 8',
  },
  {
    adminId: 'admin-03',
    planName: 'product-subscription',
    duration: '3months',
    cost: '10000',
    createdAt: '1st October',
    updatedAt: '1st October',
  },
  {
    adminId: 'admin-04',
    planName: 'some-subscription',
    duration: '5weeks',
    cost: '8000',
    createdAt: '7nd Dec',
    updatedAt: '2nd Dec',
  },
];

@Injectable({
  providedIn: 'root',
})
export class SubscriptionPlanService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return of(subscriptions);
  }
}
