// helper for search function ID from profile to admin function
// list access is list data from get profile API
// objadminf is obj the function where to filtering by ID 
// you can call objadminf from folder utils -> constans -> listAccess 

export const AdminAccess = ( listAccess: any[], objAdminF: any ) => {
    let isAccessed = false
    listAccess?.forEach(item => {
        // get access description
        if (item.ID === objAdminF['ID'] ){
            isAccessed = true
        }
    })
    return isAccessed
}

export const GetAccess = ( listAccess: any[], objFunction: any ) => {
    let isAccessed = false
    listAccess?.forEach(item => {
        // get access description
        if (item.ID === objFunction['ID'] ){
            isAccessed = true
        }
    })
    return isAccessed
}