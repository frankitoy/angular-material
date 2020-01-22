import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'zpc-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() stats: any;
  @Input() recs: number;

  constructor() { }

  ngOnInit() {
  }

}
