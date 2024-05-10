import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProfileStore {
  username: string | undefined
  setProfile: (username: string) => void
}

const useProfileStore = create<ProfileStore>()(
  persist(
    set => ({
      username: undefined,
      setProfile: username => set({ username })
    }),
    { name: 'profile-store' }
  )
)

const getProfile = () => useProfileStore.getState().username

const setProfile = (username: string) => {
  useProfileStore.setState({ username })
}

const resetProfile = () => {
  useProfileStore.setState({ username: undefined })
}

export { getProfile, resetProfile, setProfile }
