import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import User from '../../../models/user.model';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {

  form: FormGroup;
  message: string;
  messageClass: string;
  processing: boolean = false;
  emailValid: boolean;
  emailMessage: string;
  userDetailsForNavbar: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
   }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        this.validateName
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
        this.validateEmail
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        this.validatePassword
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirm') })
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null; 
    } else {
      return { 'validateEmail': true } 
    }
  }

  validateName(controls) {
    const regExp = new RegExp(/^(([A-Za-z\u00C0-\u017F])+[ ]+([A-Za-z\u00C0-\u017F])+)+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateName': true }
    }
  }

  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatePassword': true }
    }
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { 'matchingPasswords': true }
      }
    }
  }

  disableForm() {
    this.form.controls['name'].disable();
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  enableForm() {
    this.form.controls['name'].enable();
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  checkEmail() {
    const email = this.form.get('email').value;
    this.authService.checkEmail(email).subscribe(data => {
      if(data.success) {
        this.emailValid = true;
        this.emailMessage = data.message;
      } else {
        this.emailValid = false;
        this.emailMessage = data.message;
      }
    });
  }

  onRegisterSubmit() {
    
    this.processing = true;
    this.disableForm();

    const user = new User(this.form.get('email').value, this.form.get('name').value, this.form.get('password').value);

    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.messageClass = 'alert alert-success alert-custom';
        this.message = data.message;
        this.processing = false;
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {
         this.router.navigate(['/activate']);
         this.userDetailsForNavbar.name = user.name;
         this.authService.userDetailsForNavbarUpdated.emit(this.userDetailsForNavbar);
        }, 2000);
      } else {
        this.messageClass = 'alert alert-danger alert-custom';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      }
    });

  }

  ngOnInit() {
  }

}
