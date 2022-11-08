export default async function SearchValueFromArrObj(dataList:Array<any>, valueToSearch: { key: string, value: any }, keyToOuput:string ){
    let res = ''
    dataList.forEach(item => {
        if (item[valueToSearch.key] === valueToSearch.value){
            res = item[keyToOuput]
        }
    })
    return res
}