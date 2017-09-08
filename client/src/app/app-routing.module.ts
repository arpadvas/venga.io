import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ActivateComponent } from './components/activate/activate.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ActiveGuard } from './guards/active.guard';
import { NotActiveGuard } from './guards/notActive.guard';

const appRoutes: Routes = [
  { path: '',
    component: HomeComponent,
    canActivate: [NotAuthGuard]
  },
  { path: 'home',
    component: HomeComponent,
    canActivate: [NotAuthGuard]
  },
  { path: 'timeline',
    component: TimelineComponent,
    canActivate: [AuthGuard]
  },
  { path: 'activate',
    component: ActivateComponent,
    canActivate: [ActiveGuard]
  },
  { path: 'profile',
    component: ProfileComponent,
    canActivate: [NotActiveGuard]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [ ],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }