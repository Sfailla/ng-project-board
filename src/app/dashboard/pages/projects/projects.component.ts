import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SelectProjectComponent } from './components/select-project/select-project.component'
import { PageWrapperComponent } from '../../../shared/components'

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SelectProjectComponent, PageWrapperComponent],
  template: `
    <app-page-wrapper title="Projects">
      <app-select-project />
    </app-page-wrapper>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {}
