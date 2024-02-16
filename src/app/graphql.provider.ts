import { Apollo, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { onError } from '@apollo/client/link/error'
import { ApplicationConfig, inject } from '@angular/core'
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core'
import { environment } from '../environments/environment.development'
import { Router } from '@angular/router'
import { LocalStorageKeys, Routes, Messages, ErrorMessages } from './shared-types'

const uri = environment.graphqlURI

const clearAuthUserAndToken = () => {
  localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN)
  localStorage.removeItem(LocalStorageKeys.AUTH_USER)
}

export function apolloOptionsFactory(): ApolloClientOptions<unknown> {
  const clearCredentialsAndNavigateToLogin = () => {
    const router = inject(Router)
    clearAuthUserAndToken()
    router.navigate([Routes.LOGIN, { message: Messages.SESSION_EXPIRED }])
  }

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
        )
      })

      const firstError = graphQLErrors[0]

      const errorMap: { [key: string]: () => void } = {
        [ErrorMessages.JWT]: clearCredentialsAndNavigateToLogin
        // [ErrorMessages.UNAUTHORIZED]: () => window.location.reload()
      }

      errorMap[firstError.message]?.()

      if (networkError) {
        console.log(networkError)
        // setup route to error page with message
        // router.navigate(['/error', { message: networkError.message }])
      }
    }
  })

  const httpLink = inject(HttpLink)
  const link = ApolloLink.from([errorLink, httpLink.create({ uri })])

  return {
    link,
    cache: new InMemoryCache()
  }
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory
  }
]
