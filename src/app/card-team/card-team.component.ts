import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TeamStat } from '../models/team-stat';
import { NbaStatsService } from '../nba-stats.service';

@Component({
  selector: 'app-card-team',
  templateUrl: './card-team.component.html',
  styleUrls: ['./card-team.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTeamComponent {

  @Input() teamStat: TeamStat | undefined;

  constructor(private nbaStatsService: NbaStatsService){}

  deleteTeam(teamId: number):void { 
    this.nbaStatsService.deleteTeam(teamId);
  }

}
