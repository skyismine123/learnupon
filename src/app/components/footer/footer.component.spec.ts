import {FooterComponent} from './footer.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {MatToolbarModule} from '@angular/material/toolbar';

describe('FooterComponent', () => {
  let spectator: Spectator<FooterComponent>;
  const createComponent = createComponentFactory({
    component: FooterComponent,
    imports: [MatToolbarModule],
    detectChanges: false
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should show date', () => {
    spectator.component.currentDate = new Date(2020, 1, 1);
    spectator.detectChanges();
    expect(spectator.query('.current-date', {root: true}).textContent).toBe('2020 LearnUpon');
  });
});
