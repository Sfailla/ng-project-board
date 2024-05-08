import { GraphQLError } from 'graphql'
import { mockUser, mockToken } from './'
import { AuthUserInput } from '../../../app/auth/auth-types'
import { withData, withErrors } from '@testing/utils'
import { ErrorMessages } from '@shared/types'

type AuthInputOptions = { type?: 'login' | 'register' }

const loginCredentials = { email: 'sfailla@gmail.com', password: '1234' }

export const getAuthUserInput = ({ type = 'login' }: AuthInputOptions = {}): AuthUserInput => {
  return type === 'login'
    ? loginCredentials
    : { ...loginCredentials, username: 'sfailla', confirmPassword: '1234' }
}

export const baseAuthenticatedResponse = {
  user: mockUser,
  token: mockToken
}

export const mockLoginResponseWithData = withData({
  login: baseAuthenticatedResponse
})

export const mockRegisterResponseWithData = withData({
  createUser: baseAuthenticatedResponse
})

export const mockLoginResponseWithError = withErrors(<GraphQLError[]>[
  { message: ErrorMessages.LOGIN_FAILED }
])
