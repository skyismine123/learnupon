import {UserService} from './user.service';
import {createHttpFactory, HttpMethod, SpectatorHttp} from '@ngneat/spectator';
import {User, UserDto} from '../model/user.model';

describe('UserService', () => {
  let spectator: SpectatorHttp<UserService>;
  const httpService = createHttpFactory(UserService);

  beforeEach(() => spectator = httpService());

  it('should service be initialized', () => {
    expect(spectator.service).not.toBeNull();
  });

  it('should call getUsers properly', () => {
    spectator.service.getUsers().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].first_name).toBe('Learn');
      expect(data[0].last_name).toBe('Upon');
    });

    const request = spectator.expectOne('/api/v1/users', HttpMethod.GET);
    spectator.flushAll([request], [[{
      last_name: 'Upon',
      first_name: 'Learn',
      email: 'some.email@examplelms.com',
      username: 'testusername',
      password: 'password1',
      language: 'en'
    }]]);
  });

  it('should call createUser properly', () => {
    const user = {
      last_name: 'Upon',
      first_name: 'Learn',
      email: 'some.email@examplelms.com',
      username: 'testusername',
      password: 'password1',
      language: 'en'
    } as UserDto;

    spectator.service.createUser(new User(user)).subscribe(data => {
      expect(data.first_name).toBe('Learn');
      expect(data.last_name).toBe('Upon');
    });

    const request = spectator.expectOne('/api/v1/users', HttpMethod.POST);
    spectator.flushAll([request], [user]);
  });
});
