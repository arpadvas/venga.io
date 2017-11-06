import { Action } from '@ngrx/store';
import { AscentData } from '../models/ascent-data.model';

export const GET_LOADED_ASCENT_DATA_ACTION = 'GET_LOADED_ASCENT_DATA_ACTION';
export const LOAD_ASCENT_DATA_ACTION = 'LOAD_ASCENT_DATA_ACTION';
export const ASCENT_SELECTED_ACTION = 'ASCENT_SELECTED_ACTION';

export class GetLoadedAscentDataAction implements Action {

    readonly type = GET_LOADED_ASCENT_DATA_ACTION;

    constructor(public payload?: AscentData) {

    }

}

export class LoadAscentDataAction implements Action {

    readonly type = LOAD_ASCENT_DATA_ACTION;

}

export class AscentSelectedAction implements Action {
    
    readonly type = ASCENT_SELECTED_ACTION;

    constructor(public payload?: string) {
        
    }
    
}

export type Actions = GetLoadedAscentDataAction | LoadAscentDataAction | AscentSelectedAction;