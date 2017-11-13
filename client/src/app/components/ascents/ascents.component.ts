import { Component, OnInit } from '@angular/core';
import { AscentsService } from '../../services/ascents.service';
import { Ascent } from '../../models/ascent.model';
import { Store } from '@ngrx/store';
import * as AscentActions from '../../store/actions/ascents.actions';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as Mapper from './mappers/ascents-mappers';
import { AscentVM } from '../../models/ascent.vm';
import { AscentsState } from 'app/store/interfaces/ascents/ascents-state';

@Component({
  selector: 'app-ascents',
  templateUrl: './ascents.component.html',
  styleUrls: ['./ascents.component.css']
})
export class AscentsComponent implements OnInit {

  ascents$: Observable<Array<AscentVM>>;
  isAddingOrEditingAscent$: Observable<boolean>;

  constructor(
    private store: Store<AscentsState>
  ) {
      this.ascents$ = store.select(Mapper.mapStateToAscents);
      this.isAddingOrEditingAscent$ = store.select(Mapper.mapStateToIsAddingOrEditingAscent);
  }

  onAscentSelected(selectedAscentId: string) {
    this.store.dispatch(
      new AscentActions.AscentSelectedAction(selectedAscentId)
    );
  }

  onToggleAscentForm() {
    this.store.dispatch(
      new AscentActions.ToggleAscentFormAction()
    );
  }

  ngOnInit() {

    this.store.dispatch(
      new AscentActions.LoadAscentDataAction()
    );

  }

}
