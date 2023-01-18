import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'actions'];

  constructor (private userService: UserService) {
  }

  ngOnInit () {
    this.fetchUsers();
  }

  fetchUsers () {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    }, err => {
      console.log(err);
    })
  }

}
