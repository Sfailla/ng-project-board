import {
  Component
  // OnInit,
  // effect,
  // inject,
  // signal
} from '@angular/core'
import { SelectProjectComponent } from './components/select-project/select-project.component'
// import { Project } from '../../../generated/types.graphql-gen'
// import { ProjectService } from './services/project.service'

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SelectProjectComponent],
  template: `
    <div class="page-container">
      <app-select-project></app-select-project>
    </div>
  `,
  styles: [``]
})
export class ProjectsComponent {
  // projectService: ProjectService = inject(ProjectService)
  // projects = signal<Project[]>([])
  // constructor() {
  //   effect(() => {
  //     console.log({ projects: this.projects() })
  //   })
  // }
  // ngOnInit(): void {
  //   this.projectService.getProjects().subscribe(projects => {
  //     this.projects.set(projects)
  //   })
  // }
}
