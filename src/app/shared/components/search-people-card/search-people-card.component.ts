import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'zpc-search-people-card',
  templateUrl: './search-people-card.component.html',
  styleUrls: ['./search-people-card.component.scss']
})
export class SearchPeopleCardComponent implements OnInit {
  @Input() data;
  firstName: string;
  lastName: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserById(this.data && this.data.id).subscribe(({ response }: any) => {
      if (response) {
        const { first_name, last_name } = response;
        this.firstName = first_name;
        this.lastName = last_name;
      }
    });
  }
}
