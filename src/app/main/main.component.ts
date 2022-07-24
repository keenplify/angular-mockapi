import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IUser } from 'src/schemas/user.schema';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  users: IUser[] = [];
  currentUser: IUser | null = null;

  constructor(private titleService: Title, private userService: UserService) {
    this.titleService.setTitle('Main');
    userService.getUsers().then((_users) => (this.users = _users));
    userService.userData.subscribe((_user) => (this.currentUser = _user));
  }

  ngOnInit(): void {}
}
