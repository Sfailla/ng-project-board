import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { CreateProjectComponent, SelectProjectComponent } from '../projects/components'
import { PageWrapperComponent } from '@shared/components'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, SelectProjectComponent, CreateProjectComponent, PageWrapperComponent],
  template: `
    <app-page-wrapper title="Home">
      <app-select-project />
    </app-page-wrapper>
  `,
  styles: [``]
})
export class HomeComponent {}
