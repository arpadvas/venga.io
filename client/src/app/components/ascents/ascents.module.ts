import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscentsComponent } from './ascents.component';
import { AscentsRoutingModule } from './ascents-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AscentsService } from '../../services/ascents.service';
import { StoreModule } from '@ngrx/store';
import { INITIAL_APP_STATE, ApplicationState } from '../../store/application-state';
import { StoreData } from '../../store/store-data';
import { UiState } from '../../store/ui-state';
import { ActionReducerMap } from '@ngrx/store';

export const reducers: ActionReducerMap<any> = {

  };

@NgModule({
    declarations: [
        AscentsComponent
    ],
    imports: [
        CommonModule,
        AscentsRoutingModule,
        SharedModule,
        StoreModule.forRoot(reducers, { initialState: INITIAL_APP_STATE })
    ],
    providers: [
        AscentsService
    ]
})
export class AscentsModule {}