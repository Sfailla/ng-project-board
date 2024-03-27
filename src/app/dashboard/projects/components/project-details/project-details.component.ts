import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input
} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { ProjectService } from '../../services/project.service'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Project } from '@generated/types'
import { ModalService } from '@shared/services'

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  template: `
    <div class="project-details">
      <form [formGroup]="form">
        <div class="project-details__project-name-container">
          <h2>Project Name</h2>
          <ion-item>
            <ion-input
              formControlName="name"
              aria-label="Project Name"
              class="project-details__input"
              type="text"
              [value]="form.get('name')?.value" />
          </ion-item>
        </div>

        <div class="project-details__project-info">
          <div class="section owner">
            <h3>Owner</h3>
            <span>{{ project().user.username }}</span>
          </div>

          <div class="section due-date">
            <h3>Due Date</h3>
            <span>no due date</span>
          </div>
        </div>

        <div class="project-details__description-container">
          <h2>Project Description</h2>
          <ion-item>
            <ion-textarea
              formControlName="description"
              aria-label="Project Description"
              class="project-details__description"
              [value]="form.get('description')?.value" />
          </ion-item>
        </div>

        <ion-button
          color="primary"
          expand="block"
          type="submit"
          [disabled]="this.form.invalid"
          (click)="submit()">
          Save
        </ion-button>
      </form>
    </div>
  `,
  styleUrl: './project-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailsComponent implements OnInit {
  project = input.required<Project>()

  projectService: ProjectService = inject(ProjectService)
  modalService: ModalService = inject(ModalService)
  destroyRef: DestroyRef = inject(DestroyRef)

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    dueDate: new FormControl('')
  })

  ngOnInit(): void {
    this.handleInitializeForm()
  }

  handleInitializeForm(): void {
    this.form.patchValue({
      id: this.project().id,
      name: this.project().name,
      description: this.project().description,
      dueDate: this.project().dueDate || null
    })
  }

  submit(): void {
    if (this.form.valid) {
      this.projectService
        .updateProject(this.form.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(data => {
          if (data) {
            this.modalService.dismiss()
          }
        })
    }
  }
}
