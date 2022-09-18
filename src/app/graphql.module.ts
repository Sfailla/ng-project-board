import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache, ApolloLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { environment } from 'src/environments/environment'
import { AuthTokenService } from './auth/auth-token.service'

const graphqlURI = environment.graphqlURI

export function createApollo(httpLink: HttpLink, tokenService: AuthTokenService) {
	const headers = setContext((_operation, _context) => ({
		headers: {
			Accept: 'charset=utf-8'
		}
	}))

	const tokenHeader = setContext((_operation, _context) => {
		const token = tokenService.getToken()

		if (token) {
			console.log({ token })

			return {
				headers: {
					'x-auth-token': `${token}`
				}
			}
		}

		return {}
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
			deps: [HttpLink, AuthTokenService]
		}
	]
})
export class GraphQLModule {}
