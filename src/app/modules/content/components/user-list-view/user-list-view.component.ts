import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../../model/user.model';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListViewComponent implements OnInit {
  listOfUsers$: Observable<User[]>;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.listOfUsers$ = this.userService.getUsers().pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status} | Message: ${error.message}`;
    }
    console.warn(errorMessage);
    return throwError(errorMessage);
  }

  onClick(): void {
    this.router.navigate(['/create-user']).then();
  }

}
