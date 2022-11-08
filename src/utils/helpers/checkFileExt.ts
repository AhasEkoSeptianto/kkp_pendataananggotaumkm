export const IsImage = fileName => {
    if (!fileName) return null

    let listImageExtension = ['jpg','png','jpeg','gif', 'EPS','AI','PDF']
    let ext = fileName.split('.').pop()

    if (ext.includes('?')){
        ext = ext.split('?')[0]
    }
    if (listImageExtension.includes(ext)){
        return true
    }

    return false
}