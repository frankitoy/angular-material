import { Component, OnInit, Input } from '@angular/core';
import { CrowdService } from 'app/shared/services/crowd.service';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'zpc-crowds',
  templateUrl: './crowds.component.html',
  styleUrls: ['./crowds.component.scss']
})
export class CrowdsComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('type') category: string;
  @Input() term: string;
  token: string;
  f1Crowd: Array<any> = [];
  f2Crowd: Array<any> = [];

  constructor(
    private crowdService: CrowdService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.token = this.sharedService.getCookie('authToken');
    this.getCrowd(this.category, encodeURIComponent(this.term), this.token);
  }

  getCrowd(category, term, token) {
    this.crowdService.search(category, term, token).subscribe(({ response: { f1, f2 } }: any) => {
      f1[this.category].map(({title, user_id}) => this.f1Crowd = [...this.f1Crowd, { title, user_id, type: 'f1' }]);
      f2[this.category].map(({title, user_id}) => this.f2Crowd = [...this.f2Crowd, { title, user_id, type: 'f2' }]);
    });
  }
}
