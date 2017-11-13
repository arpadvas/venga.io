import * as AscentActions from '../actions/ascents.actions';
import { AscentData } from '../../models/ascent-data.model';
import { AscentsStoreData } from 'app/store/interfaces/ascents/ascents-store-data';
import { AscentsUiState } from 'app/store/interfaces/ascents/ascents-ui-state';

export function handleGetAscentDataAction(state: AscentsStoreData, action: AscentActions.GetLoadedAscentDataAction): AscentsStoreData {
    const newState: AscentsStoreData = Object.assign({}, state);
    newState.ascentData = action.payload;
    return newState;
}

export function handleAscentSelectedAction(state: AscentsUiState, action: AscentActions.AscentSelectedAction): AscentsUiState {
    const newState: AscentsUiState = Object.assign({}, state);
    newState.currentAscentId = action.payload;
    return newState;
}

export function handleAddNewAscentAction(state: AscentsStoreData, action: AscentActions.AddNewAscentAction): AscentsStoreData {
    const newState: AscentsStoreData = Object.assign({}, state);
    // newState.ascentData.ascents.push(action.payload);
    return newState;
}