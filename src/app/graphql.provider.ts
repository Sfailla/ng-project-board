import { Apollo, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { onError } from '@apollo/client/link/error'
import { inject, Provider } from '@angular/core'
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core'
import { environment } from '../environments/environment.development'
import { LocalStorageKeys, Routes, Messages, ErrorMessages } from './shared-types'
import { NavController } from '@ionic/angular'
import { ToastService } from './shared/services/toast/toast.service'
import { HttpHeaders } from '@angular/common/http'
import { TokenService } from './auth/services'

export function apolloOptionsFactory(): ApolloClientOptions<unknown> {
  const navController = inject(NavController)
  const toastService = inject(ToastService)
  const tokenService = inject(TokenService)

  const clearCredentialsAndNavigateToLogin = () => {
    tokenService.destroySession()
    toastService.setToastMessage({ variant: 'error', message: Messages.SESSION_EXPIRED })
    navController.navigateRoot(Routes.LOGIN, { animationDirection: 'back' })
  }

  const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN)

    if (token)
      operation.setContext({
        headers: new HttpHeaders({ 'x-auth-token': token })
      })

    return forward(operation)
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log('errorLink called')

    if (networkError) {
      console.log(networkError)
      // setup route to error page with message
      // router.navigate(['/error', { message: networkError.message }])
    }

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
        )
      })

      const firstError = graphQLErrors[0]

      const errorMap: Record<string, () => void> = {
        [ErrorMessages.JWT]: clearCredentialsAndNavigateToLogin
      }

      errorMap[firstError.message]?.()
    }
  })

  const httpLink = inject(HttpLink)
  const link = ApolloLink.from([
    authLink,
    errorLink,
    httpLink.create({ uri: environment.graphqlURI, withCredentials: true })
  ])

  return {
    link,
    cache: new InMemoryCache()
  }
}

export const graphqlProvider: Provider[] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory
  }
]
