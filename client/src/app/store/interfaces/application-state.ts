import { StoreData } from './store-data';
import { UiState } from './ui-state';
import { ApplicationState } from './application-state';

export interface ApplicationState {
    storeData: StoreData,
    uiState: UiState
}