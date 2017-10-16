import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import filestack from 'filestack-js';
import { ProfileService } from '../../../services/profile.service';
import { ServerResponse } from '../../../models/server-response.model';

@Component({
  selector: 'app-bg-pic',
  templateUrl: './bg-pic.component.html',
  styleUrls: ['./bg-pic.component.css']
})
export class BgPicComponent implements OnInit {

  @Input() backgroundPic;
  backgroundPicButtonVisible: boolean = false;
  @Output() processing = new EventEmitter<boolean>();
  @Output() profileUpdated = new EventEmitter<ServerResponse>();

  constructor(private profileService: ProfileService) { }

  showBackgroundPicButton() {
    this.backgroundPicButtonVisible = true;
  }

  hideBackgroundPicButton() {
    this.backgroundPicButtonVisible = false;
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
      this.backgroundPic = result.filesUploaded[0].url;
      const backgroundPicture = {
        backgroundPicture: this.backgroundPic
      };
      this.saveChanges(backgroundPicture);
    }
  }

  ngOnInit() {
  }

}
