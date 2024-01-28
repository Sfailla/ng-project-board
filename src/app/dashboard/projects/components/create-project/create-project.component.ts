import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'

@Component({
	selector: 'app-create-project',
	standalone: true,
	imports: [IonicModule],
	template: `
		<div class="page-container create-project">
			<ion-card class="create-project__card">
				<ion-grid>
					<ion-row>
						<ion-col>
							<ion-card-header class="create-project__card-header">
								<ion-card-title>New Project</ion-card-title>
							</ion-card-header>

							<form action="">
								<ion-card-content class="create-project__card-content">
									<ion-item>
										<ion-label position="floating">Project Name</ion-label>
										<ion-input type="text"></ion-input>
									</ion-item>

									<ion-item>
										<ion-label position="floating">Project Description</ion-label>
										<ion-textarea></ion-textarea>
									</ion-item>
								</ion-card-content>
							</form>
						</ion-col>
						<ion-col>placeholder</ion-col>
					</ion-row>
				</ion-grid>
			</ion-card>
		</div>
	`,
	styles: [
		`
			@import '../../../styles/abstracts';

			.create-project {
				&__card {
				}

				&__card-header {
					padding: 1.6rem;

					& ion-card-title {
						font-size: 3.2rem;
					}
				}

				&__card-content {
				}
			}
		`
	]
})
export class CreateProjectComponent {}
