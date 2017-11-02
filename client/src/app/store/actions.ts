import { Action } from '@ngrx/store';
import { Ascent } from '../models/ascent.model';

export const GET_LOADED_USER_DATA_ACTION = 'GET_LOADED_USER_DATA_ACTION';
export const LOAD_USER_DATA_ACTION = 'LOAD_USER_DATA_ACTION';

export class GetLoadedUserDataAction implements Action {

    type = GET_LOADED_USER_DATA_ACTION;

    constructor(public payload?: Ascent[]) {

    }

}

export class LoadUserDataAction implements Action {

    readonly type = LOAD_USER_DATA_ACTION;

}