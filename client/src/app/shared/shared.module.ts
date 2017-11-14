import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SidebarComponent,
        SpinnerComponent,
        TypeaheadComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports:[
        CommonModule,
        RouterModule,
        SidebarComponent,
        SpinnerComponent,
        TypeaheadComponent
    ]
})
export class SharedModule {}