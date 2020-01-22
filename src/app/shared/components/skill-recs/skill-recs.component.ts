import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SkillService } from 'app/shared/services/skill.service';

@Component({
  selector: 'zpc-skill-recs',
  templateUrl: './skill-recs.component.html',
  styleUrls: ['./skill-recs.component.scss']
})
export class SkillRecsComponent implements OnInit, OnDestroy {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  skillRecs: Array<string>;
  skillRecommended: Array<number>;

  // Doughnut
  doughnutChartType: string = 'doughnut';
  doughnutChartColors: Array<any> = [{ backgroundColor: ['#7D1CFF', '#F97190', '#2ABFF7', '#29DF8F', '#9EADC6'] }];
  isLoaded: boolean;
  userId: number;

  constructor(
    private route: Router,
    private skillService: SkillService
  ) { }

  ngOnInit() {
    const userObj = JSON.parse(localStorage.getItem('user'));
    this.userId = Number(userObj['id']);
    this.getUserSkill(this.userId);
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  getUserSkill(userId: number) {
    this.skillService.getSkillByUserId(userId).subscribe(({response}: any) => {
      this.skillRecs = response.map((skill) => this.capitalizeLetters(skill.title));
      this.skillRecommended = response.map((skill) => skill.id);
      this.isLoaded = true;
    });
  }

  // Method to capitalize the letters for every word
  capitalizeLetters(str) {
    return str.replace(/\b[a-z]/gi, function(char) {
      return char.toUpperCase();
    });
  }

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  onPromoteSkill() {
    this.route.navigate(['/profile/skills']);
  }

}
