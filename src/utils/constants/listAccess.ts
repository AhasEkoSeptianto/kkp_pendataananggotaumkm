export const AdminFunction = {
    // right management admin
    ChangeAdminFunctionDesc: { ID: 1, FunctionGroup: 'Admin Function', FunctionName: 'ChangeAdminFunctionDesc' },
    ChangeAdminRole: { ID: 16, FunctionGroup:'Admin User', FunctionName: 'ChangeAdminRole' },
    ChangeAdminActiveStatus: { ID: 17, FunctionGroup:'Admin User', FunctionName: 'ChangeAdminActiveStatus' },

    // access
    GetAdminAccess: { ID: 8, FunctionGroup: 'Admin Access', FunctionName: 'GetAdminAccess' },
    SetAdminAccess: { ID: 9, FunctionGroup: 'Admin Access', FunctionName: 'SetAdminAccess' },
    GETRoleAdminAccess: { ID:6, FunctionGroup: 'Admin Role Access', FunctionName: 'GetAdminRoleAccess' },
    SETRoleAdminAccess: { ID:7, FunctionGroup: 'Admin Role Access', FunctionName: 'SetAdminRoleAccess' },

    // list of admin
    CreateAdminUser: { ID: 14, FunctionGroup: 'Admin User', FunctionName:'CreateAdminUser' },
    GetAdminUser: { ID:15, FunctionGroup: 'Admin User', FunctionName:'GetAdminUser' },

    // role admin 
    GetAdminRole: { ID:3, FunctionGroup:'Admin Role', FunctionName:'GetAdminRole' },
    POSTAdminRole: { ID: 2, FunctionGroup:'Admin Role', FunctionName:'AddAdminRole' },
    PUTAdminRole: { ID:4, FunctionGroup:'Admin Role', FunctionName: 'EditAdminRole' },
    DELETEAdminRole: { ID:5, FunctionGroup:'Admin Role', FunctionName:'DeleteAdminRole' },

    // content management group
    GETCMGroup: { ID: 12, FunctionGroup:'Content Management Group', FunctionName: 'GetContentManagementGroup' },
    POSTCMGroup: { ID:11, FunctionGroup: 'Content Management Group', FunctionName: 'AddContentManagementGroup' },
    PUTCMGroup: { ID:13, FunctionGroup:'Content Management Group', FunctionName:'EditContentManagementGroup' },

    // user admin content management
    GETCMUser: { ID: 19, FunctionGroup:'Content Management User', FunctionName:'GetContentManagementUser' },
    POSTCMUser: { ID: 18, FunctionGroup:'Content Management User', FunctionName:'CreateContentManagementAdministrator' },
    PUTCMUser: { ID: 20, FunctionGroup:'Content Management User', FunctionName:'ChangeContentManagementUserActiveStatus' },

}

export const CMFunction = {
    // right management
    POSTCMUser: { ID: 48, FunctionGroup:'Content Management User', FunctionName:'CreateContentManagementUser' },
    SETRoleCMUser: { ID: 49, FunctionGroup:'Content Management User', FunctionName:'ChangeUserRole' },
    SETActiveStatusCMUser: {ID: 50, FunctionGroup: 'Content Management User', FunctionName:'ChangeUserActiveStatus'},

    // special access
    GETAccessUser: { ID: 25, FunctionGroup:'User Access', FunctionName:'GetCMUserAccess' },
    PUTAccessUser: { ID: 26, FunctionGroup: 'User Access', FunctionName: 'SetCMUserAccess' },
    RESETAccessUser: { ID: 27, FunctionGroup: 'User Access', FunctionName: 'ResetDefaultAccess' },

    // role access
    GETRoleAccess: { ID: 23, FunctionGroup:'Role Access', FunctionName:'GetCMRoleAccess' },
    PUTRoleAccess: { ID: 24, FunctionGroup: 'Role Access', FunctionName:'SetCMRoleAccess' },

    // role
    POSTRole: { ID: 20, FunctionGroup: 'Role', FunctionName:'AddNewRole' },
    PUTRole: { ID: 21, FunctionGroup:'Role', FunctionName:'ChangeRoleName' },
    DELETERole: { ID: 22, FunctionGroup:'Role', FunctionName:'DeleteRole' },

    // media CM
    POSTMedia: { ID : 31, FunctionGroup:'Media', FunctionName:'AddMedia' },
    PUTMedia: { ID: 32, FunctionGroup:'Media', FunctionName:'EditMediaDesc' },
    DELETEMedia: { ID: 33, FunctionGroup: 'Media', FunctionName:'DeleteMedia' },
    
    // chanel
    POSTChanel: { ID: 17, FunctionGroup: 'Channel', FunctionName:'AddChannel' },
    PUTChanel: { ID: 18, FunctionGroup:'Channel', FunctionName:'EditChannel' },
    DELETEChanel: { ID:19, FunctionGroup:'Channel', FunctionName:'DeleteChannel' },

    // category chanel
    POSTCategory: { ID: 14, FunctionGroup: 'Category', FunctionName: 'AddCategory' },
    PUTCategory: { ID:15, FunctionGroup: 'Category', FunctionName: 'EditCategory' },
    DELETECategory: { ID: 16, FunctionGroup: 'Category' , FunctionName:'DeleteCategory'},

    // topic chanel
    POSTTopic : { ID: 40, FunctionGroup:'Topic', FunctionName:'CreateTopic' },
    PUTTopic: { ID: 41, FunctionGroup:'Topic', FunctionName:'EditTopic' },
    DELETETopic : { ID: 42, FunctionGroup:'Topic', FunctionName:'DeleteTopic' },

    // news region
    POSTNewsRegion: { ID: 34, FunctionGroup:'News Region', FunctionName:'AddNewsRegion' },
    PUTNewsRegion: { ID: 35, FunctionGroup:'News Region', FunctionName:'EditNewsRegion' },
    DELETENewsRegion: { ID: 36, FunctionGroup:'News Region', FunctionName:'DeleteNewsRegion' },

    // language
    POSTLanguage: { ID:28, FunctionGroup:'Language', FunctionName:'AddLanguage'  },
    PUTLanguage: { ID: 29, FunctionGroup:'Language', FunctionName:'EditLanguage' },
    DELETELanguage: { ID:30, FunctionGroup:'Language', FunctionName:'DeleteLanguage' },

    // article
    POSTCreateArticle: { ID: 1, FunctionGroup:'Article', FunctionName:'CreateArticle' },
    GETAllArticle: { ID: 3, FunctionGroup: 'Article',FunctionName: 'GetAllArticles' },
    GETArchiveArticle: { ID: 5, FunctionGroup:'Article', FunctionName:'GetArchivedArticles' },
    PUBLISHMyArticle:  { ID: 6, FunctionGroup:'Article', FunctionName:'PublishMyArticle' },
    PUBLISHAllArticle: { ID: 7, FunctionGroup: 'Article', FunctionName: 'PublishArticle' },
    UNPUBLISHAllArticle: { ID: 8, FunctionGroup: 'Article', FunctionName: 'UnpublishArticle' },
    REJECTFromAllArticle: { ID: 9, FunctionGroup: 'Article', FunctionName: 'RejectArticle' },
    PUTMyArticle: { ID: 10, FunctionGroup:'Article', FunctionName: 'EditMyArticle' },
    PUTFromAllArticle: { ID:11, FunctionGroup: 'Article', FunctionName: 'EditArticle' },
    PUTArticleTrendingStat: { ID: 12, FunctionGroup: 'Article', FunctionName: 'ChangeArticleTrendingStatus' },
    PUTArticleMainStatus: { ID: 13, FunctionGroup: 'Article', FunctionName: 'ChangeMainArticleStatus' },

    // tag
    POSTTag: { ID: 37, FunctionGroup:'Tag', FunctionName:'AddNewTag' },
    PUTTag: { ID:38, FunctionGroup:'Tag', FunctionName:'EditTag' },
    DELETETag: { ID:39, FunctionGroup:'Tag', FunctionName:'DeleteTag' },

    // api access
    POSTAPIUser: { ID: 45, FunctionGroup:'Api User', FunctionName:'CreateApiUser' },
    SETStatusAPIUser: { ID: 46, FunctionGroup:'Api User', FunctionName:'ChangeApiUserStatus' },
    DELETEAPIUser: { ID: 47, FunctionGroup:'Api User', FunctionName:'DeleteApiUser' },

    //setting
    PUTTrendParameter: { ID: 43, FunctionGroup: 'Api User', FunctionName:'CreateApiUser' },

    PUTArticlePeriod: { ID: 44, FunctionGroup: 'Main Article Period', FunctionName:'EditMainArticlePeriod' }
}
