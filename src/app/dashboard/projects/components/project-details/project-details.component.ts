import { ChangeDetectionStrategy, Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [IonicModule],
  template: `
    <div class="project-details">
      <div class="project-details__name-container">
        <h2>Project Name</h2>
        <ion-input class="project-details__input" type="text" />
      </div>
    </div>
  `,
  styles: [
    `
      .project-details {
        padding: 24px;

        &__name-container {
          & ion-input {
            height: 36px;
            padding-bottom: 6px;
            padding-top: 6px;
          }
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsComponent {}
