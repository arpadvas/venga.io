import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AscentVM } from '../../../models/ascent.vm';

@Component({
  selector: 'ascents-list',
  templateUrl: './ascents-list.component.html',
  styleUrls: ['./ascents-list.component.css']
})
export class AscentsListComponent implements OnInit {

  @Input() ascents: AscentVM[];
  @Output() ascentSelected = new EventEmitter<string>();

  constructor() { }

  selectAscent(ascentId: string) {
    this.ascentSelected.next(ascentId);
  }

  ngOnInit() {
  }

}
