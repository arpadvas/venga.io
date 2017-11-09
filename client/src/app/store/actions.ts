import { Action } from '@ngrx/store';
import { AscentData } from '../models/ascent-data.model';
import { AscentVM } from '../models/ascent.vm';
import { Ascent } from '../models/ascent.model';

export const GET_LOADED_ASCENT_DATA_ACTION = 'GET_LOADED_ASCENT_DATA_ACTION';
export const LOAD_ASCENT_DATA_ACTION = 'LOAD_ASCENT_DATA_ACTION';
export const ASCENT_SELECTED_ACTION = 'ASCENT_SELECTED_ACTION';
export const ADD_NEW_ASCENT_ACTION = 'ADD_NEW_ASCENT_ACTION';

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

export class AddNewAscentAction implements Action {
    
        readonly type = ADD_NEW_ASCENT_ACTION;

        constructor(public payload?: Ascent) {
            
        }
    
    }

export type Actions = GetLoadedAscentDataAction | LoadAscentDataAction | AscentSelectedAction | AddNewAscentAction;