import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { IonicModule } from '@ionic/angular'
import { ComponentsModule } from './components/components.module'

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, IonicModule.forRoot({}), ComponentsModule],
	bootstrap: [AppComponent]
})
export class AppModule {}
