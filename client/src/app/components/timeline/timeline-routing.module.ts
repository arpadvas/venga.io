import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TimelineComponent } from './timeline.component';
import { NotActiveGuard } from '../../guards/notActive.guard';
import { AuthGuard } from '../../guards/auth.guard';

const timelineRoutes: Routes = [
  { path: 'timeline',
    component: TimelineComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(timelineRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }