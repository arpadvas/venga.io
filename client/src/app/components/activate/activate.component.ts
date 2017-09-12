import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  form: FormGroup;
  message: string;
  messageClass: string;
  processing: boolean = false;
  isWrongCode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      token: ['', Validators.required]
    });
  }

  disableForm() {
    this.form.controls['token'].disable();
  }

  enableForm() {
    this.form.controls['token'].enable();
  }

  onActivateSubmit() {
    this.processing = true;
    this.disableForm();
    const token = {
      token: this.form.get('token').value,
    }
    this.authService.activate(token).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger alert-custom';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
        this.isWrongCode = true;
      } else {
        this.messageClass = 'alert alert-success alert-custom';
        this.message = data.message;
        this.processing = false;
        setTimeout(() => {
          this.router.navigate(['/timeline']);
        }, 2000);
      }
    });
  }

  onResend() {
    this.router.navigate(['/activate/resend']);
    this.isWrongCode = false;
  } 

  ngOnInit() {
  }

}
