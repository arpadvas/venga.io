import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { TimelineComponent } from './components/timeline/timeline.component';

const appRoutes: Routes = [
  { path: '',
    component: HomeComponent
  },
  { path: 'timeline',
    component: TimelineComponent
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