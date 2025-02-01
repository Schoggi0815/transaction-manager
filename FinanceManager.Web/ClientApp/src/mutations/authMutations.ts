import {
  create,
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
  get,
  PublicKeyCredentialWithAssertionJSON,
  PublicKeyCredentialWithAttestationJSON,
} from '@github/webauthn-json'
import { useMutation } from '@tanstack/react-query'
import { basePath, post } from 'src/apiHelper'
import { isToken, Token } from 'src/models/Token'

export const useStartRegister = () =>
  useMutation({
    mutationFn: async ({
      email,
      displayName,
    }: {
      email: string
      displayName: string
    }) =>
      await create(
        await post(
          `${basePath}auth/registration/1`,
          { body: { email, displayName } },
          (value): value is CredentialCreationOptionsJSON =>
            typeof value === 'object' &&
            value != null &&
            'publicKey' in value &&
            typeof value.publicKey === 'object',
        ),
      ),
  })

export const useFinishRegister = () =>
  useMutation({
    mutationFn: ({
      credential,
      tokenName,
    }: {
      credential: PublicKeyCredentialWithAttestationJSON
      tokenName: string
    }) =>
      post(
        `${basePath}auth/registration/2`,
        {
          body: {
            responseJson: credential,
            tokenDescription: tokenName,
          },
        },
        isToken,
      ),
  })

export const useLogin = () => {
  const { mutateAsync: startLogin } = useLoginStart()
  const { mutateAsync: finishLogin } = useLoginFinish()

  return useMutation({
    mutationFn: async () => {
      let key: PublicKeyCredentialWithAssertionJSON

      try {
        key = await get(await startLogin())
      } catch (e) {
        console.error(e)
        throw new Error('No passkey selected')
      }

      return await finishLogin(key)
    },
  })
}

export const useLoginStart = () =>
  useMutation({
    mutationFn: () =>
      post(
        `${basePath}auth/login/1`,
        { body: {} },
        (value): value is CredentialRequestOptionsJSON =>
          typeof value === 'object' && value != null,
      ),
  })

export const useLoginFinish = () =>
  useMutation({
    mutationFn: (credential: PublicKeyCredentialWithAssertionJSON) =>
      post(`${basePath}auth/login/2`, { body: credential }, isToken),
  })

export const useRefreshToken = () =>
  useMutation({
    mutationFn: (token: Token) =>
      post(`${basePath}auth/refresh`, { body: token }, isToken),
  })
