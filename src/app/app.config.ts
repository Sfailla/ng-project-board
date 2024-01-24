import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideIonicAngular } from '@ionic/angular/standalone'
import { HttpClientModule, provideHttpClient } from '@angular/common/http'
import { graphqlProvider } from './graphql.provider'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular({}),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    graphqlProvider
  ]
}
