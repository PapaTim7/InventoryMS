import { redirect } from 'react-router-dom'

export const checkAuthLoader = () => async () => {
  // const accessToken = getAccessToken()
  // if (!accessToken) {
  if (1) {
    return redirect('/products')
  }
  return null

}
export const checkAppLoader = () => async () => {
  // const accessToken = getAccessToken()
  // if (!accessToken) {
  // if (true) {
  //   return redirect('/products')
  // }
  return null
}