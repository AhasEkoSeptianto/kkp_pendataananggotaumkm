import router from "next/router"

export const Role = () => {
    if (router.asPath.includes('/admin')){
        return 'admin'
    }

    return 'cm'
}

export const IsAdmin = () => {
    return router.asPath.includes('/admin')
}

export const IsCm = () => {
    return router.asPath.includes('/cm')
}