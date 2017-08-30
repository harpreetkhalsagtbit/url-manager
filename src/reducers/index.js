import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './AuthReducer'
import urlMetadata from './URLMetadataReducer'
import urlMetadataPreview from './URLMetadataPreviewReducer'

export default combineReducers({
  routing: routerReducer,
  auth,
  urlMetadata,
  urlMetadataPreview
})