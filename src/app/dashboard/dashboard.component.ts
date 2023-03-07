import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbaStatsService } from '../nba-stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  selectedTeamId:number =  0;

  teams$ = this.nbaStatsService.teams$;

  teamsStats$ = this.nbaStatsService.teamsStats$;


  constructor(private nbaStatsService: NbaStatsService){}

  addTeamToTrack():void {
    this.nbaStatsService.addTeam(this.selectedTeamId)
  }

}
