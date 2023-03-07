import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, merge, scan, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { Team } from './models/team';
import { TeamScoring } from './models/team-scoring';
import { TeamStat } from './models/team-stat';
import { NbaScoringService } from './nba-scoring.service';

@Injectable({
  providedIn: 'root'
})
export class NbaStatsService {

  teams$ = this.nbaScoringService.getListTeams();

  selectedTeamsIds: number[] = [];

  private addTeam$ = new Subject<number>();
  addTeamAccumulator = (teamStat: TeamStat) => (state: TeamStat[]) => ([ ...state, teamStat])
  

  private deleteTeam$ = new BehaviorSubject<number>(0);
  deleteTeamAccumulator = (teamId: number) => (state: TeamStat[]) => state.filter(teamStat => teamStat.team.id !== teamId);
 

  scanTeamsAccumulator = (state: TeamStat[], acitonAccumulator: (state: TeamStat[]) => TeamStat[]) => acitonAccumulator(state)

  addTeamStat$ = this.addTeam$.pipe(
    switchMap( teamId => combineLatest([
                  this.nbaScoringService.getTeamLatestStats(teamId),
                  this.teams$
                ]).pipe(
                  map(
                    ([teamScorings, teams]) => ({ 
                      team: teams.find(team => team.id == teamId),
                      ...this.summarisingResult(teamScorings)
                    }) as TeamStat
                  )
                )
    )
  )

  teamsStats$ = merge(
    this.addTeamStat$.pipe(map(this.addTeamAccumulator)),
    this.deleteTeam$.pipe(map(this.deleteTeamAccumulator))
  ).pipe(
    scan(this.scanTeamsAccumulator, [] as TeamStat[]),
    shareReplay(1)
  );

  

  constructor(private nbaScoringService: NbaScoringService) { }

  addTeam(teamId: number):void {
    if(teamId && !this.selectedTeamsIds.includes(teamId)){
      this.selectedTeamsIds.push(teamId);
      this.addTeam$.next(teamId);
    }
  }

  deleteTeam(teamId:number):void {
    this.selectedTeamsIds = this.selectedTeamsIds.splice(this.selectedTeamsIds.indexOf(teamId, 1))
    this.deleteTeam$.next(teamId);
  }

  private summarisingResult(teamScorings: TeamScoring[]){

    const avgScored = teamScorings.map(teamScoring => teamScoring.ptsScored).reduce(
        (ptsScoredAcc, ptsScored) => ptsScoredAcc + ptsScored
        ,0
        )/teamScorings.length;

    const avgConceded = teamScorings.map(teamScoring => teamScoring.ptsConceded).reduce(
          (ptsConcededAcc, ptsConceded) => ptsConcededAcc + ptsConceded
          ,0
          )/teamScorings.length;

    return ({
      stats: teamScorings,
      averages: {
        avgScored: Math.round(avgScored),
        avgConceded: Math.round(avgConceded)
      }
    })
  }
}
