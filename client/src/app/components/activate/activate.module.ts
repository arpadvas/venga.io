import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivateComponent } from './activate.component';
import { ActivateRoutingModule } from './activate-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        ActivateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ActivateRoutingModule,
        SharedModule
    ]
})
export class ActivateModule {}