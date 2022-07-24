import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import cookie from 'cookiejs';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { apiClient } from 'src/api';
import { IUser, userSchema } from 'src/schemas/user.schema';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userData: Subject<IUser | null> = new BehaviorSubject<IUser | null>(
    null
  );

  public readonly userData: Observable<IUser | null> =
    this._userData?.asObservable();

  async getUsers() {
    const _users = await apiClient.getAllUsers();
    return _users;
  }

  removeCurrentUser() {
    cookie.remove('user');
    this.toastr.success('Logged out successfully');
    this._userData.next(null);
    this.router.navigate(['login']);
  }

  getCurrentUser() {
    const userCookie = cookie.get('user') as string;
    if (!userCookie) return null;
    const user = userSchema.parse(JSON.parse(userCookie));

    this._userData.next(user);

    return user;
  }

  constructor(private router: Router, private toastr: ToastrService) {
    const _user = this.getCurrentUser();
    if (!_user) return;
    this._userData.next(_user);
  }
}
