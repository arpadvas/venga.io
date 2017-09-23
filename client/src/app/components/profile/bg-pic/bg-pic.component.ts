import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bg-pic',
  templateUrl: './bg-pic.component.html',
  styleUrls: ['./bg-pic.component.css']
})
export class BgPicComponent implements OnInit {

  @Input() backgroundPic;
  backgroundPicButtonVisible: boolean = false;

  constructor() { }

  showBackgroundPicButton() {
    this.backgroundPicButtonVisible = true;
  }

  hideBackgroundPicButton() {
    this.backgroundPicButtonVisible = false;
  }

  upload() {
    
  }

  ngOnInit() {
  }

}
