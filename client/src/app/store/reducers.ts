import { StoreData, INITIAL_STORE_DATA } from './interfaces/store-data';
import { Action, ActionReducerMap } from '@ngrx/store';
import { UiState, INITIAL_UI_STATE } from './interfaces/ui-state';
import { ApplicationState } from './interfaces/application-state';
import * as Helpers from './helpers';
import { Actions } from './actions';
import * as StateActions from  './actions';


function storeDataReducer(state: StoreData = INITIAL_STORE_DATA, action: Actions): StoreData {
    
    switch (action.type) {
        case StateActions.GET_LOADED_USER_DATA_ACTION:
            return Helpers.handleGetAscentsAction(state, action);
        default:
            return state;
    }
}

function uiStateReducer(state: UiState = INITIAL_UI_STATE, action: Actions): UiState {

    switch(action.type) {
        case StateActions.ASCENT_SELECTED_ACTION:
            return Helpers.handleAscentSelectedAction(state, action);
        default:
            return state;
    }
}

export const reducers: ActionReducerMap<ApplicationState> = {
storeData: storeDataReducer,
uiState: uiStateReducer
};