import { UiState } from './ui-state';

export interface UiState {
    currentAscentId: string;
    currentUser: string;
}

export const INITIAL_UI_STATE: UiState = {
    currentAscentId: undefined,
    currentUser: undefined
};