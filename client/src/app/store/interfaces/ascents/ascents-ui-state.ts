import { AscentsUiState } from './ascents-ui-state';

export interface AscentsUiState {
    currentAscentId: string;
    isAddingOrEditingAscent: boolean;
}

export const INITIAL_ASCENTS_UI_STATE: AscentsUiState = {
    currentAscentId: undefined,
    isAddingOrEditingAscent: false
};