import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'app/shared/services/user.service';
import { Profile } from 'app/shared/models/users/profile.model';

@Component({
  selector: 'zpc-rec-given',
  templateUrl: './rec-given.component.html',
  styleUrls: ['./rec-given.component.scss']
})
export class RecGivenComponent implements OnInit {
  isLoaded: boolean;
  @Input() id: string;
  @Input() type: string;
  @Input() date: boolean;
  data: Profile;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserData(this.id);
  }

  getUserData(userId: string) {
    this.userService.getUserById(userId).subscribe(({response}: any) => {
      this.data = response;
      this.isLoaded = true;
    });
  }

}
