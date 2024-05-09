import { MutationResult } from 'apollo-angular'
import { GraphQLError } from 'graphql'

export const baseApolloMutationResponse: MutationResult = {
  data: {},
  errors: undefined,
  loading: false
}

export const withMutateData = <T>(data: T) => ({
  ...baseApolloMutationResponse,
  data
})

export const withMutateErrors = (errors: GraphQLError[]) => ({
  ...baseApolloMutationResponse,
  errors
})

export const withMutateLoading = (loading: boolean) => ({
  ...baseApolloMutationResponse,
  loading
})
