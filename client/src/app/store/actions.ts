import { Action } from '@ngrx/store';
import { Ascent } from '../models/ascent.model';

export const GET_ASCENTS_ACTION = 'GET_USER_DATA_ACTION';

export class GetUserDataAction implements Action {

    type = GET_ASCENTS_ACTION;

    constructor(public payload?: Ascent[]) {

    }

}