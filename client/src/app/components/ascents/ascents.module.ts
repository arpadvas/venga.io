import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscentsComponent } from './ascents.component';
import { AscentsRoutingModule } from './ascents-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AscentsService } from '../../services/ascents.service';
import { AscentsListComponent } from './ascents-list/ascents-list.component';
import { CreateEditAscentComponent } from './create-edit-ascent/create-edit-ascent.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AscentsComponent,
        AscentsListComponent,
        CreateEditAscentComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AscentsRoutingModule,
        SharedModule
    ],
    providers: []
})
export class AscentsModule {}