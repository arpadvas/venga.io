import { UiState } from './ui-state';

export interface UiState {
    currentAscent: string;
    currentUser: string;
}

export const INITIAL_UI_STATE: UiState = {
    currentAscent: undefined,
    currentUser: undefined
};