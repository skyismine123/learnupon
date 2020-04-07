import {HomeComponent} from './home.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  const createComponent = createComponentFactory({
    component: HomeComponent,
  });

  beforeEach(() => spectator = createComponent());

  it('should create and show image', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.query('img')).toBeDefined();
  });
});
