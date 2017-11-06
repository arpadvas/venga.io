import { StoreData } from './interfaces/store-data';
import { AscentSelectedAction, GetLoadedAscentDataAction } from './actions';
import { UiState } from './interfaces/ui-state';

export function handleGetAscentDataAction(state: StoreData, action: GetLoadedAscentDataAction): StoreData {
    const newState: StoreData = Object.assign({}, state);
    newState.ascentData = action.payload;
    return newState;
}

export function handleAscentSelectedAction(state: UiState, action: AscentSelectedAction): UiState {
    const newState: UiState = Object.assign({}, state);
    newState.currentAscentId = action.payload;
    return newState;
}