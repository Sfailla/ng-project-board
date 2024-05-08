import { MutationResult } from 'apollo-angular'
import { GraphQLError } from 'graphql'

export const baseApolloResponse: MutationResult = {
  data: {},
  errors: undefined,
  loading: false
}

export const withData = <T>(data: T) => ({
  ...baseApolloResponse,
  data
})

export const withErrors = (errors: GraphQLError[]) => ({
  ...baseApolloResponse,
  errors
})

export const withLoading = (loading: boolean) => ({
  ...baseApolloResponse,
  loading
})
