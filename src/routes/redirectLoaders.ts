import { redirect } from 'react-router-dom'
import { getAccessToken } from '@/stores'

export const checkAuthLoader = () => async () => {
  const accessToken = getAccessToken()
  if (accessToken) {
    return redirect('/products')
  }
  return null

}
export const checkAppLoader = () => async () => {
  const accessToken = getAccessToken()
  if (!accessToken) {
    return redirect('/login')
  }
  return null
}