import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from './shared/shared.module'
import { GraphQLModule } from './graphql.module'

import { AppComponent } from './app.component'

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		GraphQLModule,
		HttpClientModule,
		IonicModule.forRoot({})
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
