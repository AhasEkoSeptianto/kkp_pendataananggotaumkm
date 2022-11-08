
// create object from array like [ key1: [ {key2:1}, {key2:2} ] ]
// to { label: label, value: 1 }

export function MakeObjNested2Arr(dataList:Array<any>, key1:string, key2: string, getOptionLabel:string ){

    let res = []
    dataList.forEach(item => {
        res.push({ label: item[key1][0][getOptionLabel],  value:item[key1][0][key2]})      
    })
    
    return res
}

export function MakeObjFromArr(dataList: Array<any>, setLabel:string, setValue: string){
    let res = []
    dataList?.forEach(item => {
        res.push({ [setLabel]: item, [setValue]: item })
    })
    return res
}