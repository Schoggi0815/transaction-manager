import { PublicKeyCredentialWithAttestationJSON } from '@github/webauthn-json'
import { Alert, Button, Text, TextInput } from '@mantine/core'
import { useCallback, useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { JwtStore } from 'src/hooks/useJwt'
import { Token } from 'src/models/Token'

type Props = {
  finishRegister: (data: {
    credential: PublicKeyCredentialWithAttestationJSON
    tokenName: string
  }) => Promise<Token>
  back: () => void
  credentialCreationOptions: PublicKeyCredentialWithAttestationJSON
  finishRegisterLoading: boolean
  error: Error | null
}

export const FinishRegisterPage = ({
  finishRegister,
  back,
  credentialCreationOptions,
  finishRegisterLoading,
  error,
}: Props) => {
  const [tokenName, setTokenName] = useState('')
  const [invalidTokenName, setInvalidTokenName] = useState(false)

  const register = useCallback(async () => {
    if (tokenName.length < 1 || tokenName.length > 50) {
      setInvalidTokenName(true)
      return
    } else {
      setInvalidTokenName(false)
    }

    const token = await finishRegister({
      credential: credentialCreationOptions,
      tokenName,
    })
    JwtStore.setState(() => token)
  }, [credentialCreationOptions, finishRegister, tokenName])

  return (
    <>
      {error && (
        <Alert
          color="red"
          title={'Registration failed'}
          icon={<FiAlertCircle />}
        >
          <Text>{error.message}</Text>
        </Alert>
      )}
      <TextInput
        value={tokenName}
        onChange={e => setTokenName(e.currentTarget.value)}
        label="Passkey Name"
        placeholder="Give your Passkey a name to identify"
        error={
          invalidTokenName
            ? 'Please enter a token name between 1 and 50 characters'
            : undefined
        }
      />
      <Button onClick={register} loading={finishRegisterLoading}>
        Finish Registration
      </Button>
      <Button variant="subtle" onClick={back} disabled={finishRegisterLoading}>
        Back
      </Button>
    </>
  )
}
