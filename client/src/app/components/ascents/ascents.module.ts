import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscentsComponent } from './ascents.component';
import { AscentsRoutingModule } from './ascents-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AscentsService } from '../../services/ascents.service';

@NgModule({
    declarations: [
        AscentsComponent
    ],
    imports: [
        CommonModule,
        AscentsRoutingModule,
        SharedModule
    ],
    providers: [
        AscentsService
    ]
})
export class AscentsModule {}