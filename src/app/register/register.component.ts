import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { apiClient } from 'src/api';
import { userSchema } from 'src/schemas/user.schema';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^[a-zA-Z0-9_.-]*$/i),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onFormSubmit(): void {
    console.log(this.registerForm);
    const user = userSchema.parse(this.registerForm.value);
    apiClient.addUser(user).then((res) => console.log(res));

    this.toastr.success('Registered successfully');
    this.router.navigate(['login']);
  }

  constructor(
    private titleService: Title,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.titleService.setTitle('Register');
  }

  ngOnInit(): void {}
}
