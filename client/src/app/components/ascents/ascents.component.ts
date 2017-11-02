import { Component, OnInit } from '@angular/core';
import { AscentsService } from '../../services/ascents.service';
import { Ascent } from '../../models/ascent.model';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../store/application-state';
import { GetUserDataAction } from '../../store/actions';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as Mapper from './mappers/ascents-mappers';

@Component({
  selector: 'app-ascents',
  templateUrl: './ascents.component.html',
  styleUrls: ['./ascents.component.css']
})
export class AscentsComponent implements OnInit {

  ascents$: Observable<Array<Ascent>>; // TODO:send composed data with crags by using select (section4 lectior 30)

  constructor(
    private ascentsService: AscentsService,
    private store: Store<ApplicationState>
  ) {
      this.ascents$ = store.map(Mapper.mapStateToAscents);
  }

  ngOnInit() {
    // TODO: get crags and sectors with forkjoin
    this.ascentsService.getAscents().subscribe((ascents: Ascent[]) => {
      this.store.dispatch(
        new GetUserDataAction(ascents)
      );
    });
  }

}
