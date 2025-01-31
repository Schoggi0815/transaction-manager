import { queryOptions } from '@tanstack/react-query'
import { basePath, get } from 'src/apiHelper'
import { getJwt } from 'src/utils'

export const testQueryOptions = () =>
  queryOptions({
    queryKey: ['test'],
    queryFn: ({ signal }) =>
      get(
        `${basePath}test`,
        { signal, jwt: getJwt() },
        a => typeof a === 'string',
      ),
  })
