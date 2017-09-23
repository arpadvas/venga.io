import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

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

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(profile => {
      console.log(profile);
      this.name = profile.user.name;
      this.description = profile.user.description;
      this.gender = profile.user.gender;
      this.country = profile.user.country;
      this.profilePic = profile.user.profilePicture.url;
      this.backgroundPic = profile.user.backgroundPicture.url;
    });
  }

}
