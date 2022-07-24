import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { apiClient } from 'src/api';
import { ToastrService } from 'ngx-toastr';
import cookie from 'cookiejs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'Login';

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  async onFormSubmit() {
    const value = this.loginForm.value;

    const users = await apiClient.getAllUsers();

    const user = users.filter(
      (user) =>
        user.username == value.username && user.password == value.password
    );

    if (user.length == 0) return this.toastr.error('User not found!');

    cookie.set('user', JSON.stringify(user[0]));
    this.toastr.success('Logged in!');
    this.userService.getCurrentUser();
    return this.router.navigate(['main']);
  }

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private titleService: Title,
    private userService: UserService
  ) {
    this.titleService.setTitle('Login');
  }

  ngOnInit(): void {}
}
