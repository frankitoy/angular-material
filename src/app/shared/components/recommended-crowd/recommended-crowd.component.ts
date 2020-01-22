import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'app/shared/services/user.service';
import { Profile } from 'app/shared/models/users/profile.model';

@Component({
  selector: 'zpc-recommended-crowd',
  templateUrl: './recommended-crowd.component.html',
  styleUrls: ['./recommended-crowd.component.scss']
})
export class RecommendedCrowdComponent implements OnInit {
  @Input() term: string;
  @Input() user: any;
  isLoaded: boolean;
  userData: Profile;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserData(this.user.user_id);
  }

  getUserData(userId) {
    this.userService.getUserById(userId).subscribe(({response}: any) => {
      this.userData = response;
      this.isLoaded = true;
    });
  }

}
