import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AscentStyles } from '../../../constants/ascent-styles';
import { AscentGrades } from '../../../constants/ascent-grades';
import { AscentVM } from '../../../models/ascent.vm';
import { Store } from '@ngrx/store';
import * as AscentActions from '../../../store/actions/ascents.actions';
import { Ascent } from '../../../models/ascent.model';
import { AscentsState } from 'app/store/interfaces/ascents/ascents-state';

@Component({
  selector: 'create-edit-ascent',
  templateUrl: './create-edit-ascent.component.html',
  styleUrls: ['./create-edit-ascent.component.css']
})
export class CreateEditAscentComponent implements OnInit {

  form: FormGroup;
  styles: string[] = AscentStyles;
  grades: string[] = AscentGrades;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AscentsState>
  ) {
    this.createForm();
  }

  onSubmitForm() {
    const newAscent: Ascent = {
      name: this.form.value.ascentName,
      type: 'sport',
      grade: this.form.value.grade,
      style: this.form.value.style,
      sentDate: '2017-10-11T00:00:00.000Z',
      cragId: '5a0469e5a0a8150eadfda677',
      sectorId: '5a046b0e7f5ad90fb20e7264'
    }
    console.log(newAscent);
    // this.store.dispatch(
    //   new AscentActions.AddNewAscentAction(newAscent)
    // );
  }

  createForm() {
    this.form = this.formBuilder.group({
      ascentName: '',
      style: '',
      grade: ''
    });
  }

  ngOnInit() {
  }

}
