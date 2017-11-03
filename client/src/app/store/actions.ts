import { Action } from '@ngrx/store';
import { Ascent } from '../models/ascent.model';

export const GET_LOADED_USER_DATA_ACTION = 'GET_LOADED_USER_DATA_ACTION';
export const LOAD_USER_DATA_ACTION = 'LOAD_USER_DATA_ACTION';
export const ASCENT_SELECTED_ACTION = 'ASCENT_SELECTED_ACTION';

export class GetLoadedUserDataAction implements Action {

    readonly type = GET_LOADED_USER_DATA_ACTION;

    constructor(public payload?: Ascent[]) {

    }

}

export class LoadUserDataAction implements Action {

    readonly type = LOAD_USER_DATA_ACTION;

}

export class AscentSelectedAction implements Action {
    
    readonly type = ASCENT_SELECTED_ACTION;

    constructor(public payload?: string) {
        
    }
    
}

export type Actions = GetLoadedUserDataAction | LoadUserDataAction | AscentSelectedAction;