import { Component, OnInit, Input } from '@angular/core';
import { Ask } from 'app/shared/models/ask/ask.model';
import { UserService } from 'app/shared/services/user.service';
import { Profile } from 'app/shared/models/users/profile.model';

@Component({
  selector: 'zpc-crowdfeed-header-card',
  templateUrl: './crowdfeed-header-card.component.html',
  styleUrls: ['./crowdfeed-header-card.component.scss']
})
export class CrowdfeedHeaderCardComponent implements OnInit {
  @Input() data: any[];
  @Input() type: string = null;
  @Input() relation: string = null;
  isLoaded: boolean;
  user: Profile;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser(this.data['user_id']);
  }

  getUser(id) {
    this.userService.getUserById(id).subscribe((res) => {
      this.user = res['response'];
      this.isLoaded = true;
    });
  }
}
