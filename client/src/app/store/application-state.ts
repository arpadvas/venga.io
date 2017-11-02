import { StoreData, INITIAL_STORE_DATA } from './store-data';
import { UiState, INITIAL_UI_STATE } from './ui-state';
import { ApplicationState } from './application-state';

export interface ApplicationState {
    storeData: StoreData,
    uiState: UiState
}