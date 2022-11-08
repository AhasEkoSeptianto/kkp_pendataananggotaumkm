export default function GetFileName(nameFile: string){
    let name = nameFile.split('/').pop()

    if (name){
        return name
    }else{
        return 'none'
    }
    
}