import { AscentsUiState } from './ascents-ui-state';

export interface AscentsUiState {
    currentAscentId: string;
}

export const INITIAL_ASCENTS_UI_STATE: AscentsUiState = {
    currentAscentId: undefined
};