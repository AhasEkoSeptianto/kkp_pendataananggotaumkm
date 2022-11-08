import { TOKEN_KEY } from '@utils/constants/token'
import axios, { AxiosError } from 'axios'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { ResponseFail } from '@utils/types/network'
import { JwtPayloadTypes } from '@utils/types/jwt'
import moment from 'moment'

const baseURL = 'http://localhost:3000'
const soegeeAxios = axios.create({
  baseURL,
})
axios.defaults.headers.common['Authorization'] = Cookies.get('token') ;

/* 
? TODO
[ ] add logic handler for storing the token and remove it
[ ] add logic for using with next-auth
*/
const removeCookies = err => {
  Cookies.remove(TOKEN_KEY)
  // Cookies.remove(REFRESH_TOKEN_KEY)
  return Promise.reject(err)
}

function isTokenExpired(token) {
  const decodedToken = jwtDecode<JwtPayloadTypes>(token)
  return moment(Date.now()).unix() >= decodedToken.exp
}

/* 
? TODO
[ ] Check response if response token is expired
*/
const ErrorCallback = (err: AxiosError<ResponseFail> & any) => {
  // if (
  //   err.response.status === 401 &&
  //   err.response.data?.message === "invalid or expired jwt"
  //   ) {
  // }
  return new Promise((resolve, reject) => {
    // const originalReq = err.config
    return reject(err.response)
  })
}

const responseCallback = async (response: any): Promise<any> => {
  // if (isLogin() && isTokenExpired(Cookies.get(TOKEN_KEY))) {
  //   await doRefresh()
  //   return await response
  // }
  return response
}

soegeeAxios.interceptors.response.use(responseCallback, ErrorCallback)
export default soegeeAxios
