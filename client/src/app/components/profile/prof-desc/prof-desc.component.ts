import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prof-desc',
  templateUrl: './prof-desc.component.html',
  styleUrls: ['./prof-desc.component.css']
})
export class ProfDescComponent implements OnInit {

  @Input() name: string;
  @Input() description: string;
  @Input() gender: string;
  @Input() country: string;
  showDescriptionPencil: boolean = false;
  editDescription: boolean = false;
  descriptionEdited: string;

  constructor() { }

  showEditDescription() {
    this.editDescription = true;
    this.descriptionEdited = this.description;
  }

  saveDescription() {
    this.editDescription = false;
    this.description = this.descriptionEdited;
    console.log(this.descriptionEdited);
  }

  ngOnInit() {
  }

}
