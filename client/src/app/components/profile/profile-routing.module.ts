import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { NotActiveGuard } from '../../guards/notActive.guard';

const profileRoutes: Routes = [
  { path: '',
    component: ProfileComponent,
    canActivate: [NotActiveGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(profileRoutes)],
  providers: [NotActiveGuard],
  bootstrap: [],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }