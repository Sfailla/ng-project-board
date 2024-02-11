import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { SelectProjectComponent } from '../projects/components'
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, SelectProjectComponent, PageWrapperComponent],
  template: `
    <app-page-wrapper title="Home">
      <app-select-project></app-select-project>
    </app-page-wrapper>
  `,
  styles: [``]
})
export class HomeComponent {
  constructor() {}
}
