import { ApolloQueryResult } from '@apollo/client'
import { GraphQLError } from 'graphql'

export const baseApolloQueryResponse: ApolloQueryResult<unknown> = {
  data: {},
  error: undefined,
  loading: false,
  networkStatus: 7
}

export const withQueryData = <T>(data: T) => ({
  ...baseApolloQueryResponse,
  data
})

export const withQueryError = <T>(error: GraphQLError) => ({
  ...baseApolloQueryResponse,
  data: {} as T,
  error
})

export const withQueryLoading = (loading: boolean) => ({
  ...baseApolloQueryResponse,
  loading
})
