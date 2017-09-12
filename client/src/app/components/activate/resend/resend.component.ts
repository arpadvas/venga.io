import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resend',
  templateUrl: './resend.component.html',
  styleUrls: ['./resend.component.css']
})
export class ResendComponent implements OnInit {

  form: FormGroup;
  message: string;
  messageClass: string;
  processing: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  disableForm() {
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['password'].enable();
  }

  onResendSubmit() {
    this.processing = true;
    this.disableForm();
    const password = {
      password: this.form.get('password').value,
    }
    this.authService.resendActCode(password).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger alert-custom';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success alert-custom';
        this.message = data.message;
        this.processing = false;
        setTimeout(() => {
          this.router.navigate(['/activate']);
        }, 2000);
      }
    });
  }

  ngOnInit() {
  }

}
