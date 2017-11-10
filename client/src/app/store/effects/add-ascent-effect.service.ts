import { Injectable } from '@angular/core';
import { AscentsService } from '../../services/ascents.service';
import { Actions, Effect } from '@ngrx/effects';
import { ADD_NEW_ASCENT_ACTION, LoadAscentDataAction, AddNewAscentAction } from '../actions';
import * as StateActions from  '../actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';

@Injectable()
export class AddAscentEffectService {

  constructor(
    private actions$: Actions,
    private ascentsService: AscentsService
  ) { }

  @Effect() newAscent$: Observable<Action> = this.actions$
    .ofType(ADD_NEW_ASCENT_ACTION)
    .switchMap((action: AddNewAscentAction) => this.ascentsService.addAscent(action.payload))
    .map(action => new LoadAscentDataAction());

}