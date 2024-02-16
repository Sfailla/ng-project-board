import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideIonicAngular } from '@ionic/angular/standalone'
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'
import { graphqlProvider } from './graphql.provider'
import { authInterceptor } from './auth/interceptors'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideIonicAngular({}),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    graphqlProvider
  ]
}
