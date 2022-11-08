export const RemoveDuplicateValueObjArr = ( arrObj, keyToRemoveDuplicate ) => {
    let functions = []
    let removeDuplicate = []
    arrObj?.forEach(item => {
        if (!removeDuplicate.includes(item['keyToRemoveDuplicate'])){
            removeDuplicate.push(item['keyToRemoveDuplicate'])
            functions.push(item)
        }
    })
    return functions
}

export const RemoveDuplicateValueObjArrWithNestedKey = ( arrObj, key1, key2 ) => {
    let functions = []
    let removeDuplicate = []
    arrObj?.forEach(item => {
        if (!removeDuplicate.includes(item[key1][key2])){
            removeDuplicate.push(item[key1][key2])
            functions.push(item)
        }
    })
    return functions
}

export const RemoveValueArr = (arr: any[], value: string | number) => {
    return arr.filter(item => (item !== value))
}