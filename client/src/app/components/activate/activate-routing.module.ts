import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActivateComponent } from './activate.component';
import { ActiveGuard } from '../../guards/active.guard';
import { ResendComponent } from './resend/resend.component';

const activateRoutes: Routes = [
  { path: '',
    component: ActivateComponent,
    canActivate: [ActiveGuard]
  },
  { path: 'resend',
    component: ResendComponent,
    canActivate: [ActiveGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(activateRoutes)],
  providers: [ActiveGuard],
  bootstrap: [],
  exports: [RouterModule]
})
export class ActivateRoutingModule { }