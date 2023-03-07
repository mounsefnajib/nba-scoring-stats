import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format, formatISO, subDays } from 'date-fns';
import { catchError, EMPTY, map, Observable, shareReplay, tap } from 'rxjs';
import { ApiResponse } from './models/api-response';
import { Team } from './models/team';
import { TeamScoring } from './models/team-scoring';

@Injectable({
  providedIn: 'root'
})
export class NbaScoringService {

  private baseUrl = 'https://free-nba.p.rapidapi.com';
  constructor(private http: HttpClient) { }

  getListTeams():Observable<Team[]>{
    return this.http.get<ApiResponse<Team>>(this.baseUrl.concat('/teams'))
      .pipe(
        map(response => response.data),
        shareReplay(1)
      );
  }

  getTeamLatestStats(teamId: number): Observable<TeamScoring[]>{
    const options = { 
      params: new HttpParams({ fromObject: { 
                    'page': 0,
                    'dates[]': this.getLatestTwelvesDays(),
                    'team_ids[]': [teamId],
                    'per_page': 12
                  } 
                })
              };
    return this.http.get<ApiResponse<TeamScoring>>(this.baseUrl.concat('/games'),options).pipe(
      map(response => response.data.map(
        teamScoring => this.calculStats(teamId, teamScoring)
      )),
      catchError(err => {
        throw err;
      })
    )
  }

  calculStats(teamId: number, teamScoring: TeamScoring): TeamScoring{
    teamScoring
    const ptsScored = teamScoring.home_team.id === teamId ? teamScoring.home_team_score : teamScoring.visitor_team_score;
    const ptsConceded = teamScoring.home_team.id !== teamId ? teamScoring.home_team_score : teamScoring.visitor_team_score;

    return ({
        ...teamScoring,
        ptsScored,
        ptsConceded,
        winLose: ptsScored > ptsConceded ? 'W' : 'L'

      });
  }

  getLatestTwelvesDays(): string[]{
    return [0,1,2,3,4,5,6,7,8,9,10,11].map(
      day => formatISO(subDays(new Date(), day),{ representation: 'date' })
    )
  }
}
