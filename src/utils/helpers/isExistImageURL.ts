export default function IsImageURLExist(image_path, cbExist, cbNotExist){
    let img = new Image()
    img.onload = cbExist
    img.onerror = cbNotExist
    img.src = image_path
}