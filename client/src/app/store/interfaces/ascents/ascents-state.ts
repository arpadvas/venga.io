import { AscentsState } from './ascents-state';
import { AscentsUiState } from 'app/store/interfaces/ascents/ascents-ui-state';
import { AscentsStoreData } from 'app/store/interfaces/ascents/ascents-store-data';

export interface AscentsState {
    ascentsStoreData: AscentsStoreData,
    ascentsUiState: AscentsUiState
}