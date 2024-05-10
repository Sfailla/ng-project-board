import { GraphQLError } from 'graphql'
import { mockUser, mockToken } from './'
import { AuthUserInput } from '../../../app/auth/auth-types'
import {
  baseApolloMutationResponse,
  baseApolloQueryResponse,
  withData,
  withErrors
} from '@testing/utils'
import { ErrorMessages } from '@shared/types'

type AuthInputOptions = {
  type?: 'login' | 'register'
  updateKey?: Partial<AuthUserInput>
}

const loginCredentials = { email: 'sfailla@gmail.com', password: '1234' }
const registerCredentials = { username: 'sfailla', confirmPassword: '1234' }

export const getAuthUserInput = ({
  type = 'login',
  updateKey
}: AuthInputOptions = {}): AuthUserInput => {
  return type === 'login'
    ? { ...loginCredentials, ...updateKey }
    : { ...loginCredentials, ...registerCredentials, ...updateKey }
}

export const baseAuthenticatedResponse = {
  user: mockUser,
  token: mockToken
}

export const mockLoginResponseWithData = withData({
  login: baseAuthenticatedResponse
})(baseApolloMutationResponse)

export const mockRegisterResponseWithData = withData({
  createUser: baseAuthenticatedResponse
})(baseApolloMutationResponse)

export const mockLoginResponseWithError = withErrors(<GraphQLError[]>[
  { message: ErrorMessages.LOGIN_FAILED }
])(baseApolloMutationResponse)

export const mockRegisterResponseWithError = withErrors(<GraphQLError[]>[
  { message: ErrorMessages.REGISTRATION_FAILED }
])(baseApolloMutationResponse)

export const mockLogoutResponseWithData = withData({
  logout: {
    user: null
  }
})(baseApolloQueryResponse)
