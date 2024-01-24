import { Apollo, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { inject, Provider } from '@angular/core'
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core'
import { HttpHeaders } from '@angular/common/http'
import { environment } from '../environments/environment.development'

const uri = environment.graphqlURI
export function apolloOptionsFactory(): ApolloClientOptions<unknown> {
  const httpLink = inject(HttpLink)
  const token = sessionStorage.getItem('token') || ''
  return {
    link: httpLink.create({
      uri,
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-auth-token': token }),
      withCredentials: true
    }),
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
