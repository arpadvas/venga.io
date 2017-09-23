import { Component, OnInit, Input } from '@angular/core';

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

  upload() {
    
  }

  ngOnInit() {
  }

}
