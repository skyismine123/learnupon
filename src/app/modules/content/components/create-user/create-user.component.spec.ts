import {CreateUserComponent} from './create-user.component';
import {createRoutingFactory, Spectator} from '@ngneat/spectator';
import {MatButtonModule} from '@angular/material/button';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../../../services/user.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {of} from 'rxjs';
import {User} from '../../../../model/user.model';
import {Router} from '@angular/router';
import {MatSnackBarModule} from "@angular/material/snack-bar";

describe('CreateUserComponent', () => {
  let spectator: Spectator<CreateUserComponent>;
  const createComponent = createRoutingFactory({
    component: CreateUserComponent,
    imports: [ReactiveFormsModule, MatButtonModule, MatInputModule,
      MatFormFieldModule, MatSnackBarModule, RouterTestingModule],
    mocks: [UserService],
    detectChanges: false
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should init form fields', () => {
    expect(spectator.queryAll('.mat-form-field', {root: true}).length).toBe(5);
    expect(spectator.queryAll('input').length).toBe(5);
    expect(spectator.queryAll('button').length).toBe(1);
  });

  it('should init disabled button when form is touched and invalid', () => {
    spectator.typeInElement('test', spectator.query('input'));
    spectator.detectChanges();
    expect((spectator.query('button') as HTMLButtonElement).disabled).toBeTruthy();
  });

  it('should enable button when form is filled with data', () => {
    spectator.detectChanges();
    const inputElements = spectator.queryAll('input');
    spectator.typeInElement('test', inputElements[0]);
    spectator.typeInElement('test', inputElements[1]);
    spectator.typeInElement('test@test.com', inputElements[2]);
    spectator.typeInElement('test', inputElements[3]);
    spectator.typeInElement('test123', inputElements[4]);
    spectator.detectChanges();
    expect((spectator.query('button') as HTMLButtonElement).disabled).toBeFalsy();
  });

  it('should properly navigate after saving user', () => {
    spectator.inject(Router).navigate.andReturn(new Promise(null));
    spectator.inject(UserService).createUser.andReturn(of(new User({
      last_name: 'Upon',
      first_name: 'Learn',
      email: 'some.email@examplelms.com',
      username: 'testusername',
      password: 'password1',
      language: 'en',
      user_type: 'manager'
    })));
    spectator.detectChanges();
    const inputElements = spectator.queryAll('input');
    spectator.typeInElement('test', inputElements[0]);
    spectator.typeInElement('test', inputElements[1]);
    spectator.typeInElement('test@test.com', inputElements[2]);
    spectator.typeInElement('test', inputElements[3]);
    spectator.typeInElement('test123', inputElements[4]);
    spectator.detectChanges();
    spectator.click('button');
    expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['/users']);
  });
});
