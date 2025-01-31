import { Stack, Alert, Button, Text } from '@mantine/core'
import { useCallback } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { FetchError } from 'src/apiHelper'
import { JwtStore } from 'src/hooks/useJwt'
import { useLogin } from 'src/mutations/authMutations'

type Props = {
  toRegisterForm: () => void
}

export const LoginPage = ({ toRegisterForm }: Props) => {
  const { mutateAsync: login, error, isPending } = useLogin()

  const handleLogin = useCallback(async () => {
    const token = await login()
    JwtStore.setState(() => token)
  }, [login])

  const errorMessage =
    error instanceof FetchError && error.code === 403
      ? 'Passkey not valid'
      : error?.message

  return (
    <Stack>
      {error && (
        <Alert color="red" title={'Login failed'} icon={<FiAlertCircle />}>
          <Text>{errorMessage}</Text>
        </Alert>
      )}
      <Button onClick={handleLogin} loading={isPending}>
        Login with Passkey
      </Button>
      <Button variant="outline" onClick={toRegisterForm} disabled={isPending}>
        Register a new Account
      </Button>
    </Stack>
  )
}
