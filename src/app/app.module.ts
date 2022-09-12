import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from './shared/shared.module'

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, IonicModule.forRoot({}), SharedModule],
	bootstrap: [AppComponent]
})
export class AppModule {}
