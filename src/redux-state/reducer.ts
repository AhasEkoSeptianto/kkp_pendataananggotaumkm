import { screenReducer } from '@features/screen'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { authPersistConfig, menuPersisConfig } from './persist'


/* 
===== TODO =====
[ ] Auth Features
[ ] Routes Features
[ ] Product Features
[ ] Clinic Features
=== END TODO ===
*/

const reducer = combineReducers({
  screen: screenReducer,
})

export default reducer
