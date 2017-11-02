import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscentsComponent } from './ascents.component';
import { AscentsRoutingModule } from './ascents-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AscentsService } from '../../services/ascents.service';
import { AscentsListComponent } from './ascents-list/ascents-list.component';

@NgModule({
    declarations: [
        AscentsComponent,
        AscentsListComponent
    ],
    imports: [
        CommonModule,
        AscentsRoutingModule,
        SharedModule
    ],
    providers: []
})
export class AscentsModule {}