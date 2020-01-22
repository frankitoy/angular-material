import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutesService } from 'app/shared/services/routes.service';
import { UserActions } from 'app/actions/user.actions';

@Component({
  selector: 'zpc-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private routesService: RoutesService,
    private userActions: UserActions,
  ) { }

  ngOnInit() {
    this.getRouteId();
  }

  getRouteId() {
    this.routesService.getRelationRoutes(this.route).subscribe(({type, userId}: any) => {
      this.userActions.getUserRelation(userId, type);
    });
  }
}
