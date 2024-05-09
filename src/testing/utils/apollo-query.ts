import { ApolloQueryResult } from '@apollo/client'
import { GraphQLError } from 'graphql'

export const baseApolloQueryResponse = {
  data: {},
  error: undefined,
  loading: false,
  networkStatus: 7
} as ApolloQueryResult<unknown>

export const withQueryData = <T>(data: T) => ({
  ...baseApolloQueryResponse,
  data
})

export const withQueryErrors = (errors: GraphQLError[]) => ({
  ...baseApolloQueryResponse,
  errors
})

export const withQueryLoading = (loading: boolean) => ({
  ...baseApolloQueryResponse,
  loading
})
