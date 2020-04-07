import {UserListViewComponent} from './user-list-view.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {UserService} from '../../../../services/user.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {User} from '../../../../model/user.model';

describe('UserListViewComponent', () => {
  let spectator: Spectator<UserListViewComponent>;
  const createComponent = createComponentFactory({
    component: UserListViewComponent,
    imports: [MatExpansionModule, MatButtonModule, RouterTestingModule],
    mocks: [UserService],
    detectChanges: false
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should show list of users', () => {
    spectator.inject(UserService).getUsers.andReturn(of([new User({
      last_name: 'Upon',
      first_name: 'Learn',
      email: 'some.email@examplelms.com',
      username: 'testusername',
      password: 'password1',
      language: 'en',
      user_type: 'manager'
    })]));
    spectator.detectChanges();
    expect(spectator.queryAll('.mat-expansion-panel', {root: true}).length).toBe(1);
  });

  it('should show proper user data', () => {
    spectator.inject(UserService).getUsers.andReturn(of([new User({
      last_name: 'Upon',
      first_name: 'Learn',
      email: 'some.email@examplelms.com',
      username: 'testusername',
      password: 'password1',
      language: 'en',
      user_type: 'manager'
    })]));
    spectator.detectChanges();
    expect(spectator.query('.mat-expansion-panel', {root: true}).textContent.trim())
      .toBe('Learn Upon  Learn Upon - some.email@examplelms.com - manager');
  });
});
