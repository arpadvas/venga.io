import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { ActivateComponent } from './components/activate/activate.component';
import { NotAuthGuard } from './guards/notAuth.guard';
import { ActiveGuard } from './guards/active.guard';

const appRoutes: Routes = [
  { path: '',
    component: HomeComponent,
    canActivate: [NotAuthGuard]
  },
  { path: 'home',
    component: HomeComponent,
    canActivate: [NotAuthGuard]
  },
  { path: 'activate',
    component: ActivateComponent,
    canActivate: [ActiveGuard]
  },
  { path: 'profile',
    loadChildren: './components/profile/profile.module#ProfileModule'
  },
  { path: '**', 
    component: HomeComponent,
    canActivate: [NotAuthGuard]
   }
];

@NgModule({
  declarations: [ ],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }