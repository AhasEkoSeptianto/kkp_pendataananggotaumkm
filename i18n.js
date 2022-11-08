module.exports = {
  defaultLocale: 'id',
  locales: ['en', 'id'],
  loader: false,
  pages: {
    '*': ['common'],
    '/404': ['error'],
    '/': ['home'],
    '/back-office/settings/general': ['setting-general'],
    '/back-office/settings/company-profile': ['company-profile'],
    '/back-office/settings/exchange': ['setting-exchange'],
    '/back-office/settings/management_right': ['admin-setting'],
    '/back-office/settings/branch/list-head-branch': ['branch-setting'],
    '/back-office/users/clients':['user-client'],
    '/back-office/users/mitra':['user-mitra'],
    '/back-office/users/meta_accounts':['user-metaaccount'],
    '/back-office/users/profile':['user-profile'],
    
    // branch
    '/branch-office/users/client':['user-client'],
    // '/dashboard': ['home'],
    // 'rgx:^/more-examples': ['more-examples'],
  },
  // interpolation: {
  //   prefix: '${',
  //   suffix: '}',
  // },
  // When loader === false, then loadLocaleFrom is reyarnquired
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/language/resources/${locale}/${namespace}`).then(
      m => m.default
    ),
}
