import { ApolloQueryResult } from '@apollo/client'
import { MutationResult } from 'apollo-angular'
import { GraphQLError } from 'graphql'

export const baseApolloQueryResponse: ApolloQueryResult<unknown> = {
  data: {},
  error: undefined,
  loading: false,
  networkStatus: 7
}

export const baseApolloMutationResponse: MutationResult = {
  data: {},
  errors: undefined,
  loading: false
}

export const withData =
  <T>(data: T) =>
  (response: ApolloQueryResult<T> | MutationResult) => ({
    ...response,
    data
  })

export const withError =
  <T>(error: GraphQLError) =>
  (response: ApolloQueryResult<T> | MutationResult) => ({
    ...response,
    error
  })

export const withErrors =
  <T>(errors: GraphQLError[]) =>
  (response: ApolloQueryResult<T> | MutationResult) => ({
    ...response,
    errors
  })

export const withLoading =
  <T>(loading: boolean) =>
  (response: ApolloQueryResult<T> | MutationResult) => ({
    ...response,
    loading
  })
