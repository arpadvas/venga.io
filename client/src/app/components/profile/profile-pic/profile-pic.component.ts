import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import filestack from 'filestack-js';
import { ProfileService } from '../../../services/profile.service';
import { ServerResponse } from '../../../models/server-response.model';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.css']
})
export class ProfilePicComponent implements OnInit {

  @Input() profilePic;
  profilePicButtonVisible: boolean = false;
  @Output() processing = new EventEmitter<boolean>();
  @Output() profileUpdated = new EventEmitter<ServerResponse>();

  constructor(private profileService: ProfileService) { }

  showProfilePicButton() {
    this.profilePicButtonVisible = true;
  }

  hideProfilePicButton() {
    this.profilePicButtonVisible = false;
  }

  saveChanges(updated) {
    this.processing.emit(true);
    this.profileService.updateProfile(updated).subscribe((res: ServerResponse) => {
      this.processing.emit(false);
      this.profileUpdated.emit(res);
    });
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
      const profilePicture = {
        profilePicture: this.profilePic
      };
      this.saveChanges(profilePicture);
    }
  }

  ngOnInit() {
  }

}
