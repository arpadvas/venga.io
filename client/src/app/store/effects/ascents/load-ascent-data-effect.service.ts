import { Injectable } from '@angular/core';
import { AscentsService } from '../../../services/ascents.service';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';
import * as AscentActions from '../../actions/ascents.actions';

@Injectable()
export class LoadAscentDataEffectService {

  constructor(
    private actions$: Actions,
    private ascentsService: AscentsService
  ) { }

  @Effect() ascentData$: Observable<Action> = this.actions$
    .ofType(AscentActions.LOAD_ASCENT_DATA_ACTION)
    .switchMap(() => this.ascentsService.getAscents())
    .map(response => new AscentActions.GetLoadedAscentDataAction(response.payload));

}
