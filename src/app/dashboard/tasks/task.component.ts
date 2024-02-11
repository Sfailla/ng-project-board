import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component'
import { IonicModule } from '@ionic/angular'

@Component({
  standalone: true,
  imports: [IonicModule, PageWrapperComponent],
  selector: 'app-task',
  template: `
    <app-page-wrapper title="Tasks">
      <h1>Tasks</h1>
    </app-page-wrapper>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {}
