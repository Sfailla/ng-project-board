import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-task-mock',
  standalone: true,
  template: `
    <div>Task Component</div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MockTaskComponent {}
