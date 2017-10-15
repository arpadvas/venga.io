import { Component, OnInit, Input } from '@angular/core';
import filestack from 'filestack-js';

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

  async upload() {
    const filestackApiKey: string = 'Ay5j7d8n6SjWjkhUeHOHxz';
    const client = filestack.init(filestackApiKey);
    const result = await client.pick({
      accept: 'image/*',
      fromSources:  ['local_file_system','facebook','googledrive','instagram','dropbox','imagesearch','webcam',],
      maxSize: 1024*2024,
      maxFiles: 1,
    });
    if (result) {
      this.backgroundPic = result.filesUploaded[0].url;
    }
  }

  ngOnInit() {
  }

}
