import { createTheme, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'src/index.css'
import { routeTree } from 'src/routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const theme = createTheme({
  autoContrast: true,
  colors: {
    darkYellow: [
      '#faf9eb',
      '#f2f1dd',
      '#e4e1ba',
      '#d4d193',
      '#c8c372',
      '#c0ba5d',
      '#bcb551',
      '#a59f41',
      '#928d37',
      '#7e7a2a',
    ],
  },
  primaryColor: 'darkYellow',
})

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
