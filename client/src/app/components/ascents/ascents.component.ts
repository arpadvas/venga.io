import { Component, OnInit } from '@angular/core';
import { AscentsService } from '../../services/ascents.service';
import { Ascent } from '../../models/ascent.model';

@Component({
  selector: 'app-ascents',
  templateUrl: './ascents.component.html',
  styleUrls: ['./ascents.component.css']
})
export class AscentsComponent implements OnInit {

  constructor(private ascentsService: AscentsService) { }

  ngOnInit() {
    // TODO: get crags and sectors with forkjoin
    this.ascentsService.getAscents().subscribe((result: Ascent[]) => {
      console.log(result);
    });
  }

}
