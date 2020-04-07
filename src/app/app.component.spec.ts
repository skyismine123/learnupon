import {
  createComponentFactory,
  Spectator
} from '@ngneat/spectator/jest';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    imports: [RouterTestingModule],
    component: AppComponent,
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });
  let spectator: Spectator<AppComponent>;
  beforeEach(() => spectator = createComponent());

  it('should create the app', () => {
    const app = spectator.component;
    expect(app).toBeTruthy();
  });
});

