import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-home-mock',
  standalone: true,
  template: `
    <div>Home Component</div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MockHomeComponent {}
