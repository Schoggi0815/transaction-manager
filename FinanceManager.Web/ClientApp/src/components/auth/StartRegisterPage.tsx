import { Alert, Button, Text, TextInput } from '@mantine/core'
import { useCallback, useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

type Props = {
  startRegister: (data: { email: string; displayName: string }) => void
  startRegisterLoading: boolean
  error: Error | null
  swithToLogin: () => void
}

export const StartRegisterPage = ({
  startRegister,
  startRegisterLoading,
  error,
  swithToLogin,
}: Props) => {
  const [email, setEmail] = useState('')
  const [invalidEmail, setInvalidEmail] = useState(false)

  const [displayName, setDisplayName] = useState('')
  const [invalidDisplayName, setInvalidDisplayName] = useState(false)

  const handleRegister = useCallback(async () => {
    let isValid = true
    if (!/^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
      setInvalidEmail(true)
      isValid = false
    } else {
      setInvalidEmail(false)
    }

    if (displayName.length < 3 || displayName.length > 50) {
      setInvalidDisplayName(true)
      isValid = false
    } else {
      setInvalidDisplayName(false)
    }

    if (!isValid) {
      return
    }

    startRegister({ email, displayName })
  }, [displayName, email, startRegister])

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
        label="Email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
        error={invalidEmail ? 'Please enter a valid Email' : undefined}
      />
      <TextInput
        label="Display Name"
        value={displayName}
        onChange={e => setDisplayName(e.currentTarget.value)}
        error={
          invalidDisplayName
            ? 'Please enter a name between 3 and 50 characters'
            : undefined
        }
      />
      <Button onClick={handleRegister} loading={startRegisterLoading}>
        Register
      </Button>
      <Button variant="outline" onClick={swithToLogin}>
        Log in
      </Button>
    </>
  )
}
