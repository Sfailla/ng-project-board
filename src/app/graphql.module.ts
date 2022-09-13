import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache, ApolloLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

const graphqlURI = 'http://localhost:4000'

export function createApollo(httpLink: HttpLink) {
	const headers = setContext((operation, context) => ({
		headers: {
			Accept: 'charset=utf-8'
		}
	}))

	const tokenHeader = setContext((operation, context) => {
		// get token from authService
		let token

		if (token === null) {
			return {}
		} else {
			return {
				headers: {
					'x-auth-token': `${token}`
				}
			}
		}
	})

	const link = ApolloLink.from([
		headers,
		tokenHeader,
		httpLink.create({ uri: graphqlURI, withCredentials: true })
	])
	const cache = new InMemoryCache()

	return {
		link,
		cache
	}
}

@NgModule({
	exports: [HttpClientModule, ApolloModule],
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApollo,
			deps: [HttpLink]
		}
	]
})
export class GraphQLModule {}
