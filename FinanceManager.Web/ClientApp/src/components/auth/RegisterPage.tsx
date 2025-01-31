import { Stack } from '@mantine/core'
import { FinishRegisterPage } from 'src/components/auth/FinishRegisterPage'
import { StartRegisterPage } from 'src/components/auth/StartRegisterPage'
import {
  useFinishRegister,
  useStartRegister,
} from 'src/mutations/authMutations'

type Props = {
  swithToLogin: () => void
}

export const RegisterPage = ({ swithToLogin }: Props) => {
  const {
    data: credentialCreationOptions,
    mutate: startRegister,
    isPending: startRegisterLoading,
    reset,
    error: startRegisterError,
  } = useStartRegister()

  const {
    mutateAsync: finishRegister,
    isPending: finishRegisterLoading,
    error: finishRegisterError,
  } = useFinishRegister()

  return (
    <Stack>
      {credentialCreationOptions ? (
        <FinishRegisterPage
          finishRegister={finishRegister}
          back={reset}
          credentialCreationOptions={credentialCreationOptions}
          finishRegisterLoading={finishRegisterLoading}
          error={finishRegisterError}
        />
      ) : (
        <StartRegisterPage
          startRegister={startRegister}
          startRegisterLoading={startRegisterLoading}
          error={startRegisterError}
          swithToLogin={swithToLogin}
        />
      )}
    </Stack>
  )
}
