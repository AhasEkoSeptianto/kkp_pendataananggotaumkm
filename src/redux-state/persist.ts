import storage from 'redux-persist/lib/storage'

export const globalPersistConfig = {
  key: 'global',
  whitelist: ['auth', 'forms'],
  storage,
}

export const authPersistConfig = {
  key: 'auth',
  storage: storage,
}

export const menuPersisConfig = {
  key: 'Menu',
  storage: storage
}