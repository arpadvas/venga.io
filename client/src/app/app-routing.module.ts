import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/core/home/home.component';
import { NotAuthGuard } from './guards/notAuth.guard';

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
    loadChildren: './components/activate/activate.module#ActivateModule'
  },
  { path: 'profile',
    loadChildren: './components/profile/profile.module#ProfileModule'
  },
  { path: 'ascents',
    loadChildren: './components/ascents/ascents.module#AscentsModule'
},
  { path: '**', 
    component: HomeComponent,
    canActivate: [NotAuthGuard]
   }
];

@NgModule({
  declarations: [ ],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [NotAuthGuard],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }