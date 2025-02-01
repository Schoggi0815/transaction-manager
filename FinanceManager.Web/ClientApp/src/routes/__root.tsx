import { AppShell, Burger, Button, Group, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import React, { Suspense, useCallback } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { AuthenticationPage } from 'src/components/auth/AuthenticationPage'
import { useJwt, useLogOut } from 'src/hooks/useJwt'

export const Route = createRootRoute({
  component: RootComponent,
})

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then(res => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      )

function RootComponent() {
  const [opened, { toggle, close }] = useDisclosure()

  const jwt = useJwt()
  const logOut = useLogOut()

  const handleLogOut = useCallback(() => {
    logOut()
    close()
  }, [close, logOut])

  if (jwt == null) {
    return <AuthenticationPage />
  }

  return (
    <>
      <AppShell
        header={{ height: 54 }}
        aside={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group align="center" justify="end" h="100%" p="xs">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
          </Group>
        </AppShell.Header>

        <AppShell.Aside p="md">
          <Stack justify="flex-end">
            <Button
              color="red"
              variant="light"
              leftSection={<FiLogOut />}
              onClick={handleLogOut}
            >
              Logout
            </Button>
          </Stack>
        </AppShell.Aside>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  )
}
