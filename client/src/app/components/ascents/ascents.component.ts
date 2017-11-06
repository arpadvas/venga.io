import { Component, OnInit } from '@angular/core';
import { AscentsService } from '../../services/ascents.service';
import { Ascent } from '../../models/ascent.model';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../store/interfaces/application-state';
import * as Actions from '../../store/actions';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as Mapper from './mappers/ascents-mappers';
import { AscentVM } from '../../models/ascent.vm';

@Component({
  selector: 'app-ascents',
  templateUrl: './ascents.component.html',
  styleUrls: ['./ascents.component.css']
})
export class AscentsComponent implements OnInit {

  ascents$: Observable<Array<AscentVM>>;

  constructor(
    private store: Store<ApplicationState>
  ) {
      this.ascents$ = store.select(Mapper.mapStateToAscents);
  }

  onAscentSelected(selectedAscentId: string) {
    this.store.dispatch(
      new Actions.AscentSelectedAction(selectedAscentId)
    );
  }

  ngOnInit() {

    this.store.dispatch(
      new Actions.LoadAscentDataAction()
    );

  }

}
