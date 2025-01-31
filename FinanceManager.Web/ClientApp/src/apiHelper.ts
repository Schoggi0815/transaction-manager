export const basePath = '/api/v1/'

export const get = async <T>(
  url: string,
  options: { jwt?: string; signal: AbortSignal },
  isT: (value: unknown) => value is T,
): Promise<T> =>
  await handleResponse(await fetch(url, buildRequestInit('GET', options)), isT)

export const post = async <T>(
  url: string,
  options: {
    jwt?: string
    body: unknown
  },
  isT: (value: unknown) => value is T,
) =>
  await handleResponse(await fetch(url, buildRequestInit('POST', options)), isT)

export const del = async <T>(
  url: string,
  options: {
    jwt?: string
  },
  isT: (value: unknown) => value is T,
) =>
  await handleResponse(
    await fetch(url, buildRequestInit('DELETE', options)),
    isT,
  )

export const buildRequestInit = (
  method: string,
  options: { jwt?: string; body?: unknown; signal?: AbortSignal },
) => {
  const init: RequestInit = { method }

  if (options.body != null) init.body = JSON.stringify(options.body)

  init.headers = {
    ...init.headers,
    'Content-Type': 'application/json',
  }

  init.signal = options.signal

  if (options.jwt)
    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${options.jwt}`,
    }

  return init
}

export const handleResponse = async <T>(
  response: Response,
  isT: (value: unknown) => value is T,
): Promise<T> => {
  if (!response.ok) {
    throw new FetchError(await response.text(), response.status)
  }

  let json: unknown = undefined
  if (response.status !== 204) {
    json = await response.json()
  }
  if (!isT(json)) {
    throw new Error(
      'Response does not match expected Type. Make sure your client is up to date.',
    )
  }
  return json
}

export class FetchError extends Error {
  code: number

  constructor(message: string, code: number) {
    super(message)
    this.name = 'ValidationError'
    this.code = code
  }
}
