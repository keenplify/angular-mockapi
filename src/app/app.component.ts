import { Component } from '@angular/core';
import { IUser, userSchema } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {}
}
