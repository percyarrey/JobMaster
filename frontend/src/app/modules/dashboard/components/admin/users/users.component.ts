import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { agent } from './interface/agent';
import { textLength } from '../../../../../shared/utils/textLength';
interface event {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  textLength = textLength;
  constructor(private route: ActivatedRoute, private router: Router) {}
  /* SEARCH USER */
  searchValue: string = '';

  searchUser() {
    const queryParams = { ...this.route.snapshot.queryParams }; // Get the existing query parameters
    queryParams['s'] = this.searchValue;
    queryParams['sortby'] = this.sortBy;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }

  /* SORT BY */
  sortBy: undefined;

  /* PAGINATOR */

  first: number = 0;

  items: number = 8;

  totalRecords: number = 120;

  options = [
    { label: 8, value: 8 },
    { label: 12, value: 12 },
  ];

  onPageChange(event: event) {
    this.first = event.first || 0;
    this.items = event.rows || 8;
    console.log(event.rows);
    const queryParams = { ...this.route.snapshot.queryParams }; // Get the existing query parameters
    queryParams['first'] = this.searchValue;
    queryParams['items'] = this.searchValue;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }

  /* AGENCIES */
  agencies: agent[] = [];
  ngOnInit(): void {
    this.agencies = [
      {
        profile: {
          userId: '2123123123',
          fname: 'Enow',
          lname: ' fedricks',
          profilePic: 'assets/images/client/home/agents/agent1.png',
          type: 'Agency',
        },
        service: {
          name: 'Electrician',
        },
      },
      {
        profile: {
          userId: '2123123123',
          fname: 'now',
          lname: 'fedirico',
          profilePic: 'assets/images/client/home/agents/agent3.png',
          type: 'Agency',
        },
        service: {
          name: 'Electrician',
        },
      },
      {
        profile: {
          userId: '987654321',
          fname: 'John',
          lname: 'Doe',
          profilePic: 'assets/images/client/home/agents/agent2.png',
          type: 'Agency',
        },
        service: {
          name: 'Plumber',
        },
      },
      {
        profile: {
          userId: '123456789',
          fname: 'Jane',
          lname: 'Smith',
          profilePic: 'assets/images/client/home/agents/agent3.png',
          type: 'Client',
          blockedStatus: 'blocked',
        },
        service: {
          name: 'Carpenter',
        },
      },
      {
        profile: {
          userId: '456789123',
          fname: 'Michael',
          lname: 'Johnson',
          profilePic: 'assets/images/client/home/agents/agent4.png',
          type: 'Agency',
        },
        service: {
          name: 'Painter',
        },
      },
      {
        profile: {
          userId: '789123456',
          fname: 'Sarah',
          lname: 'Williams',
          profilePic: 'assets/images/client/home/agents/agent1.png',
          type: 'Client',
        },
        service: {
          name: 'Gardener',
        },
      },
      {
        profile: {
          userId: '321654987',
          fname: 'Robert',
          lname: 'Brown',
          profilePic: 'assets/images/client/home/agents/agent3.png',
          type: 'Agency',
        },
        service: {
          name: 'Handyman',
        },
      },
    ];
  }

  selectedUser: boolean = false;
}
