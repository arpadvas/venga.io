import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ascent } from '../../../models/ascent.model';

@Component({
  selector: 'ascents-list',
  templateUrl: './ascents-list.component.html',
  styleUrls: ['./ascents-list.component.css']
})
export class AscentsListComponent implements OnInit {

  @Input() ascents: Ascent[];
  @Output() ascentSelected = new EventEmitter<string>();

  constructor() { }

  selectAscent(ascentId: string) {
    this.ascentSelected.next(ascentId);
  }

  ngOnInit() {
  }

}
