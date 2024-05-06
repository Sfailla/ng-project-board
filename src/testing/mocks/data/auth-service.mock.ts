import { MutationResult } from 'apollo-angular'
import { GraphQLError } from 'graphql'
import { mockUser, mockToken } from './'
import { LoginMutation } from '@generated/mutations'

// Base object that returns the default mutation response
export const baseMutationResponse: MutationResult = {
  data: {},
  errors: undefined,
  loading: false
}

export const baseAuthenticatedResponse = {
  user: mockUser,
  token: mockToken
}

export const withData = (data: LoginMutation) => ({
  ...baseMutationResponse,
  data
})

export const withErrors = (errors: GraphQLError[]) => ({
  ...baseMutationResponse,
  errors
})

export const withLoading = (loading: boolean) => ({
  ...baseMutationResponse,
  loading
})
