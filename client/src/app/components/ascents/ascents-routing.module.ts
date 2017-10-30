import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AscentsComponent } from './ascents.component';
import { NotActiveGuard } from '../../guards/notActive.guard';

const ascentsRoutes: Routes = [
  { path: '',
    component: AscentsComponent,
    canActivate: [NotActiveGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(ascentsRoutes)],
  providers: [NotActiveGuard],
  bootstrap: [],
  exports: [RouterModule]
})
export class AscentsRoutingModule { }