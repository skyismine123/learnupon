import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../../model/user.model';
import {Router} from '@angular/router';
import {Subject, throwError} from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  user: User = new User();
  unSubscribe = new Subject();

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.userForm.valueChanges
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(value => {
        this.user.first_name = value.firstName;
        this.user.last_name = value.lastName;
        this.user.email = value.email;
        this.user.password = value.password;
        this.user.username = value.userName;
      });
  }

  saveUser(): void {
    this.userService.createUser(this.user)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(response => {
          this.router.navigate(['/users']).then();
        }
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

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
