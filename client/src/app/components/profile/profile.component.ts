import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ServerResponse } from '../../models/server-response.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string;
  description: string;
  gender: string;
  country: string;
  message: string;
  messageClass: string;
  profilePic: string;
  backgroundPic: string;
  processing: boolean = false;

  constructor(
    private profileService: ProfileService
  ) { }

  onProcessing(data: boolean) {
    if (data) {
      this.processing = true;
    } else {
      this.processing = false;
    }
  }

  onProfileUpdated(data: ServerResponse) {
    if (data.success) {
      this.messageClass = 'alert alert-success alert-custom';
      this.message = data.message;
    } else {
      this.messageClass = 'alert alert-danger alert-custom';
      this.message = data.message;
    }
    setTimeout(() => {
      this.messageClass = '';
      this.message = '';
    }, 2000);
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe(profile => {
      console.log(profile);
      this.name = profile.user.name;
      this.description = profile.user.description;
      this.gender = profile.user.gender;
      this.country = profile.user.country;
      this.profilePic = profile.user.profilePicture;
      this.backgroundPic = profile.user.backgroundPicture;
    });
  }

}
