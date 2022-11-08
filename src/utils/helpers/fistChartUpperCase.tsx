export const CapitalizeText = ( text: string ) => {
    let result = []
    let toArr = text.split(' ')
    toArr.forEach(item => {
        let make = item.charAt(0).toUpperCase() + item.slice(1)
        result.push(make)
    })

    return result.join(' ')
}
