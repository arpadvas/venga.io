import { Injectable } from '@angular/core';
import { AscentsService } from '../../services/ascents.service';
import { Actions, Effect } from '@ngrx/effects';
import { LOAD_USER_DATA_ACTION, GetLoadedUserDataAction } from '../actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import { Action } from '@ngrx/store';

@Injectable()
export class LoadUserDataEffectService {

  constructor(
    private actions$: Actions,
    private ascentsService: AscentsService
  ) { }

  @Effect() userData$: Observable<Action> = this.actions$
    .ofType(LOAD_USER_DATA_ACTION)
    .switchMap(() => this.ascentsService.getAscents())
    .map(ascents => new GetLoadedUserDataAction(ascents));

}
