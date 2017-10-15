import { Component, OnInit, Input } from '@angular/core';
import filestack from 'filestack-js';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.css']
})
export class ProfilePicComponent implements OnInit {

  @Input() profilePic;
  profilePicButtonVisible: boolean = false;

  constructor() { }

  showProfilePicButton() {
    this.profilePicButtonVisible = true;
  }

  hideProfilePicButton() {
    this.profilePicButtonVisible = false;
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
      this.profilePic = result.filesUploaded[0].url;
    }
  }

  ngOnInit() {
  }

}
