import { StoreData } from './interfaces/store-data';
import { AscentSelectedAction, GetLoadedAscentDataAction, AddNewAscentAction } from './actions';
import { UiState } from './interfaces/ui-state';
import { AscentData } from '../models/ascent-data.model';

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

export function handleAddNewAscentAction(state: StoreData, action: AddNewAscentAction): StoreData {
    const newState: StoreData = Object.assign({}, state);
    newState.ascentData.ascents.push(action.payload);
    return newState;
}