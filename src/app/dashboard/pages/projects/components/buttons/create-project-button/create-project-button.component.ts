import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { Routes } from '@shared/types'

@Component({
  selector: 'app-create-project-button',
  standalone: true,
  imports: [IonicModule, RouterModule],
  template: `
    <li class="create-project">
      <a [routerLink]="Routes.CREATE_PROJECT" routerDirection="forward">
        <span>
          <ion-icon name="add-outline" />
        </span>
        <ion-label class="create-project-title">Create Project</ion-label>
      </a>
    </li>
  `,
  styleUrl: 'create-project-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProjectButtonComponent {
  Routes: typeof Routes = Routes
}
