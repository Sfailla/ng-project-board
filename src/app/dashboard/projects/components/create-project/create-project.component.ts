import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { CreateProjectFormComponent, PageWrapperComponent } from '../../../../shared/components'
import { DesktopPreviewComponent } from '../desktop-preview/desktop-preview.component'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [IonicModule, PageWrapperComponent, DesktopPreviewComponent, CreateProjectFormComponent],
  template: `
    <app-page-wrapper title="Create Project">
      <div class="create-project">
        <ion-card class="create-project__card">
          <div class="create-project__left-side">
            <div class="content-container">
              <ion-card-header class="create-project__card-header">
                <ion-card-title>New Project</ion-card-title>
              </ion-card-header>
              <ion-card-content class="create-project__card-content">
                <app-create-project-form [form]="form" />
              </ion-card-content>
            </div>
          </div>
          <div class="create-project__right-side">
            <div class="background-image"></div>
          </div>

          <app-desktop-preview></app-desktop-preview>
        </ion-card>
      </div>
    </app-page-wrapper>
  `,
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  form = new FormGroup({
    projectName: new FormControl('', Validators.required),
    projectDescription: new FormControl('')
  })
}
