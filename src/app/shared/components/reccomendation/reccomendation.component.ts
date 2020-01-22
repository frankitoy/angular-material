import { Component, OnInit, Input } from '@angular/core';
import { SkillService } from 'app/shared/services/skill.service';
import { AskService } from 'app/shared/services/ask.service';

@Component({
  selector: 'zpc-reccomendation',
  templateUrl: './reccomendation.component.html',
  styleUrls: ['./reccomendation.component.scss']
})
export class ReccomendationComponent implements OnInit {
  @Input() data: any;
  @Input() recType: string = null;
  skillRecs: number = 0;
  askRecs: number = 0;

  constructor(
    private skillService: SkillService,
    private askService: AskService
  ) { }

  ngOnInit() {
    if (this.recType === 'skill') {
      this.fetchSkillRecs(this.data.id);
    } else {
      this.fetchAskRecs(this.data.id);
    }
  }

  fetchSkillRecs(skillId: number) {
    this.skillService.getSkillRecs(skillId).subscribe(({response}: any) => this.skillRecs = response.length);
  }

  fetchAskRecs(askId: number) {
    this.askService.getAskRecs(askId).subscribe(({response}: any) => this.askRecs = response.length);
  }

}
