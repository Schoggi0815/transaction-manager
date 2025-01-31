import { Flex, Paper } from '@mantine/core'
import { useState } from 'react'
import { LoginPage } from 'src/components/auth/LoginPage'
import { RegisterPage } from 'src/components/auth/RegisterPage'

export const AuthenticationPage = () => {
  const [activePage, setActivePage] = useState<'login' | 'register'>('login')

  return (
    <Flex justify="center" align="center" h="100%">
      <Paper className="w-full max-w-[400px]" p="xl" shadow="xl">
        {activePage === 'login' ? (
          <LoginPage toRegisterForm={() => setActivePage('register')} />
        ) : (
          <RegisterPage swithToLogin={() => setActivePage('login')} />
        )}
      </Paper>
    </Flex>
  )
}
