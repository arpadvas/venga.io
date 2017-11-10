import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AscentStyles } from '../../../constants/ascent-styles';
import { AscentGrades } from '../../../constants/ascent-grades';
import { AscentVM } from '../../../models/ascent.vm';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../store/interfaces/application-state';
import * as Actions from '../../../store/actions';
import { Ascent } from '../../../models/ascent.model';

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
    private store: Store<ApplicationState>
  ) {
    this.createForm();
  }

  onSubmitForm() {
    const newAscent: Ascent = {
      _id: '4546465',
      name: this.form.value.ascentName,
      type: 'sport',
      grade: this.form.value.grade,
      style: this.form.value.style,
      sentDate: '2017-10-11T00:00:00.000Z',
      senderId: '5a045440114f510844765a95',
      cragId: '5a0469e5a0a8150eadfda677',
      sectorId: '5a046b0e7f5ad90fb20e7264'
    }
    console.log(newAscent);
    this.store.dispatch(
      new Actions.AddNewAscentAction(newAscent)
    );
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
