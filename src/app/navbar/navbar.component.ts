import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/schemas/user.schema';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser: IUser | null = null;

  constructor(private userService: UserService) {
    userService.userData.subscribe((user) => (this.currentUser = user));
  }

  logout() {
    this.userService.removeCurrentUser();
  }

  ngOnInit(): void {}
}
