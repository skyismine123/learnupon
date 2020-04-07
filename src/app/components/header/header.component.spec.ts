import {HeaderComponent} from './header.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {RouterTestingModule} from '@angular/router/testing';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory({
    component: HeaderComponent,
    imports: [MatToolbarModule, MatMenuModule, RouterTestingModule]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should show logo which is used as dropdown', () => {
    expect(spectator.query('.logo-wrapper', {root: true})).toBeTruthy();
  });
});
