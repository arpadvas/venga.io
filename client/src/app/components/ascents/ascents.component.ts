import { Component, OnInit } from '@angular/core';
import { AscentsService } from '../../services/ascents.service';
import { Ascent } from '../../models/ascent.model';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../store/application-state';
import { GetUserDataAction } from '../../store/actions';

@Component({
  selector: 'app-ascents',
  templateUrl: './ascents.component.html',
  styleUrls: ['./ascents.component.css']
})
export class AscentsComponent implements OnInit {

  constructor(
    private ascentsService: AscentsService,
    private store: Store<ApplicationState>
  ) {
      store.subscribe(state => console.log(state));
    }

  ngOnInit() {
    // TODO: get crags and sectors with forkjoin
    this.ascentsService.getAscents().subscribe((ascents: Ascent[]) => {
      console.log(ascents);
      this.store.dispatch(
        new GetUserDataAction(ascents)
      );
    });
  }

}
