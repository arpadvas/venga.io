import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscentsComponent } from './ascents.component';
import { AscentsRoutingModule } from './ascents-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        AscentsComponent
    ],
    imports: [
        CommonModule,
        AscentsRoutingModule,
        SharedModule
    ]
})
export class AscentsModule {}