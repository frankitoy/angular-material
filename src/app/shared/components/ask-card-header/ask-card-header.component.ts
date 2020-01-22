import { Component, OnInit, Input } from '@angular/core';
import { Ask } from 'app/shared/models/ask/ask.model';
import { UserService } from 'app/shared/services/user.service';
import { Profile } from 'app/shared/models/users/profile.model';

@Component({
  selector: 'zpc-ask-card-header',
  templateUrl: './ask-card-header.component.html',
  styleUrls: ['./ask-card-header.component.scss']
})
export class AskCardHeaderComponent implements OnInit {
  @Input() ask: Ask;
  @Input() type: string = null;
  @Input() relation: string = null;
  isLoaded: boolean;
  user: Profile;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser(this.ask.user_id);
  }

  getUser(id) {
    this.userService.getUserById(id).subscribe((res) => {
      this.user = res['response'];
      this.isLoaded = true;
    });
  }

}
