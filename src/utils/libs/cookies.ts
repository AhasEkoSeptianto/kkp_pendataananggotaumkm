import Cookies from 'js-cookie'

export const GetCookies = ( keyName: string ) => {
    return Cookies.get(keyName)
}

export const SetCookies = ( key:string, value: any ) => {
    Cookies.set(key,value)
}

export const RemoveCookies = ( keyName: string ) => {
    Cookies.remove(keyName)
}