import { StoreData } from './interfaces/store-data';
import { AscentSelectedAction, GetLoadedUserDataAction } from './actions';
import { UiState } from './interfaces/ui-state';

export function handleGetAscentsAction(state: StoreData, action: GetLoadedUserDataAction): StoreData {
    const newState: StoreData = Object.assign({}, state);
    newState.ascents = action.payload;
    return newState;
}

export function handleAscentSelectedAction(state: UiState, action: AscentSelectedAction): UiState {
    const newState: UiState = Object.assign({}, state);
    newState.currentAscentId = action.payload;
    return newState;
}