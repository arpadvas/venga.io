import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { TimelineRoutingModule } from './timeline-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        TimelineComponent
    ],
    imports: [
        CommonModule,
        TimelineRoutingModule,
        SharedModule
    ]
})
export class TimelineModule {}