export const IsArray = ( arr ) => {
    return (!!arr) && (arr.constructor === Array);
}

export const IsObject = ( obj ) => {
    return (!!obj) && (obj.constructor === Object);
}