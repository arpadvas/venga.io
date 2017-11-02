import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ascents-list',
  templateUrl: './ascents-list.component.html',
  styleUrls: ['./ascents-list.component.css']
})
export class AscentsListComponent implements OnInit {

  @Input() ascents;

  constructor() { }

  ngOnInit() {
  }

}
