import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { IonIconTitleDirective } from '@shared/directives'

@Component({
  standalone: true,
  imports: [IonicModule, IonIconTitleDirective],
  template: `
    <ion-icon name="list-outline" iconTitle="Title" ionIconRemoveTitle />
  `
})
export class TestComponent {}
