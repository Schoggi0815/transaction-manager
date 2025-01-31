import { AppShell, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { AuthenticationPage } from 'src/components/auth/AuthenticationPage'
import { useJwt } from 'src/hooks/useJwt'
import { testQueryOptions } from 'src/queries/testQueries'

function App() {
  const [opened, { toggle }] = useDisclosure()
  const jwt = useJwt()

  const { data: testData, error } = useQuery({
    ...testQueryOptions(),
    enabled: jwt != null,
  })

  if (jwt == null) {
    return <AuthenticationPage />
  }

  console.log(error)

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>{testData}</AppShell.Main>
    </AppShell>
  )
}

export default App
