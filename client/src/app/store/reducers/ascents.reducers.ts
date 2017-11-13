import { Action, ActionReducerMap } from '@ngrx/store';
import * as Helpers from '../helpers/ascents.helpers';
import { Actions } from '../actions/ascents.actions';
import * as AscentActions from '../actions/ascents.actions';
import { AscentsStoreData, INITIAL_ASCENTS_STORE_DATA } from 'app/store/interfaces/ascents/ascents-store-data';
import { AscentsUiState, INITIAL_ASCENTS_UI_STATE } from 'app/store/interfaces/ascents/ascents-ui-state';
import { AscentsState } from 'app/store/interfaces/ascents/ascents-state';


function ascentsDataReducer(state: AscentsStoreData = INITIAL_ASCENTS_STORE_DATA, action: Actions): AscentsStoreData {
    
    switch (action.type) {
        case AscentActions.GET_LOADED_ASCENT_DATA_ACTION:
            return Helpers.handleGetAscentDataAction(state, action);
        case AscentActions.ADD_NEW_ASCENT_ACTION:
            return Helpers.handleAddNewAscentAction(state, action);
        default:
            return state;
    }
}

function ascentsUiStateReducer(state: AscentsUiState = INITIAL_ASCENTS_UI_STATE, action: Actions): AscentsUiState {

    switch(action.type) {
        case AscentActions.ASCENT_SELECTED_ACTION:
            return Helpers.handleAscentSelectedAction(state, action);
        default:
            return state;
    }
}

export const ascentsReducers: ActionReducerMap<AscentsState> = {
    ascentsStoreData: ascentsDataReducer,
    ascentsUiState: ascentsUiStateReducer
};