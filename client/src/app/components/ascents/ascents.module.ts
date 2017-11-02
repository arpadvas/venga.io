import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AscentsComponent } from './ascents.component';
import { AscentsRoutingModule } from './ascents-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AscentsService } from '../../services/ascents.service';
import { StoreModule, Action } from '@ngrx/store';
import { ApplicationState } from '../../store/application-state';
import { StoreData, INITIAL_STORE_DATA } from '../../store/store-data';
import { UiState, INITIAL_UI_STATE } from '../../store/ui-state';
import { ActionReducerMap } from '@ngrx/store';
import { GET_ASCENTS_ACTION, GetUserDataAction } from '../../store/actions';

export const reducers: ActionReducerMap<ApplicationState> = {
    storeData: storeDataReducer,
    uiState: uiStateReducer
};

function storeDataReducer(state: StoreData = INITIAL_STORE_DATA, action: Action): StoreData {

    switch (action.type) {
        case GET_ASCENTS_ACTION:
            return handleGetAscentsAction(state, action);

        default:
            return state;
    }
}

function uiStateReducer(state: UiState = INITIAL_UI_STATE, action: Action): UiState {
    
        return state;
    }

function handleGetAscentsAction(state: StoreData, action: GetUserDataAction): StoreData {
    const ascents = action.payload;
    const newState: StoreData = Object.assign({}, state);
    newState.ascents = ascents;
    return newState;
}

@NgModule({
    declarations: [
        AscentsComponent
    ],
    imports: [
        CommonModule,
        AscentsRoutingModule,
        SharedModule,
        StoreModule.forRoot(reducers)
    ],
    providers: [
        AscentsService
    ]
})
export class AscentsModule {}