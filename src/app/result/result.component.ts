import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NbaStatsService } from '../nba-stats.service';
import { combineLatest, map,} from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ResultComponent {

  
  teamStat$ = combineLatest([
    this.route.paramMap,
    this.nbaStatsService.teamsStats$
  ]).pipe(
    map(
      ([params, teamsStats]) =>  teamsStats.find(teamStat => teamStat.team.abbreviation === params.get('teamCode'))
    )
  )

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private nbaStatsService: NbaStatsService
    ){}

  goBack(): void {
      this.location.back();
  }


}
