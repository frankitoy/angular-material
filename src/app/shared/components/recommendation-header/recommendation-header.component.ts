import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'zpc-recommendation-header',
  templateUrl: './recommendation-header.component.html',
  styleUrls: ['./recommendation-header.component.scss']
})
export class RecommendationHeaderComponent implements OnInit {
  @Input() type: string;
  @Input() id: string;
  @Input() title: string;
  @Input() date: string;
  @Input() routeType: string = null;
  @Input() relation: string = null;
  @Input() recsCount: number = 0;
  @Input() firstName: string = null;
  data;
  isLoaded: boolean;

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
