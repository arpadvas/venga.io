import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AscentStyles } from '../../../constants/ascent-styles';
import { AscentGrades } from '../../../constants/ascent-grades';

@Component({
  selector: 'create-edit-ascent',
  templateUrl: './create-edit-ascent.component.html',
  styleUrls: ['./create-edit-ascent.component.css']
})
export class CreateEditAscentComponent implements OnInit {

  form: FormGroup;
  styles: string[] = AscentStyles;
  grades: string[] = AscentGrades;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
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
