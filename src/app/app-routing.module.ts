import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'results/:teamCode', component: ResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
