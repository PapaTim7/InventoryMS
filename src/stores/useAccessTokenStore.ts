import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AccessTokenStore {
  accessToken: string | undefined
  setAccessToken: (token: string) => void
}

const useAccessTokenStore = create<AccessTokenStore>()(
  persist(
    set => ({
      accessToken: undefined,
      setAccessToken: accessToken => set({ accessToken })
    }),
    { name: 'token-store' }
  )
)

const getAccessToken = () => useAccessTokenStore.getState().accessToken

const setAccessToken = (accessToken: string) => {
  useAccessTokenStore.setState({ accessToken })
}

const resetAccessToken = () => {
  useAccessTokenStore.setState({ accessToken: undefined })
}

export { getAccessToken, resetAccessToken, setAccessToken }
