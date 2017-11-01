import { StoreData } from './store-data';
import { UiState } from './ui-state';

export interface ApplicationState {
    storeData: StoreData,
    uiState: UiState
}