import { Injectable } from '@angular/core';
import { AscentsService } from '../../../services/ascents.service';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';
import * as AscentActions from '../../actions/ascents.actions';

@Injectable()
export class AddAscentEffectService {

  constructor(
    private actions$: Actions,
    private ascentsService: AscentsService
  ) { }

  @Effect() newAscent$: Observable<Action> = this.actions$
    .ofType(AscentActions.ADD_NEW_ASCENT_ACTION)
    .switchMap((action: AscentActions.AddNewAscentAction) => this.ascentsService.addAscent(action.payload))
    .map(action => new AscentActions.LoadAscentDataAction());

}