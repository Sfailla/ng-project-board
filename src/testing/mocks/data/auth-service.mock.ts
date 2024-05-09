import { GraphQLError } from 'graphql'
import { mockUser, mockToken } from './'
import { AuthUserInput } from '../../../app/auth/auth-types'
import { withMutateData, withMutateErrors, withQueryData } from '@testing/utils'
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

export const mockLoginResponseWithData = withMutateData({
  login: baseAuthenticatedResponse
})

export const mockRegisterResponseWithData = withMutateData({
  createUser: baseAuthenticatedResponse
})

export const mockLoginResponseWithError = withMutateErrors(<GraphQLError[]>[
  { message: ErrorMessages.LOGIN_FAILED }
])

export const mockRegisterResponseWithError = withMutateErrors(<GraphQLError[]>[
  { message: ErrorMessages.REGISTRATION_FAILED }
])

export const mockLogoutResponseWithData = withQueryData({
  logout: {
    user: null
  }
})
