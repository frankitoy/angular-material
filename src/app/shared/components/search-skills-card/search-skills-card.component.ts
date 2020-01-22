import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'app/shared/services/user.service';
import { AskService } from 'app/shared/services/ask.service';

@Component({
  selector: 'zpc-search-skills-card',
  templateUrl: './search-skills-card.component.html',
  styleUrls: ['./search-skills-card.component.scss']
})
export class SearchSkillsCardComponent implements OnInit {
  @Input() data;
  firstName: string;
  lastName: string;
  totalRec: number;

  constructor(
    private userService: UserService,
    private askService: AskService
  ) { }

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

    this.askService.getAskRecs(this.data.id).subscribe(({ response }: any) => {
      this.totalRec = response.length;
    });
  }
}
