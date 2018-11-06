import {combineReducers} from 'redux'
import basicReducer from './basicReducer/basicReducerReducer'
import dashboardReducer from './dashboardReducer/dashboardReducerReducer'
import usersReducer from './usersReducer/usersReducerReducer'
import loginReducer from './loginReducer/loginReducerReducer'
import applicationActivityReducer from './applicationActivityReducer/applicationActivityReducerReducer'
import templateDetailReducer from './templateDetailReducer/templateDetailReducerReducer'
import reviewsReducer from './reviewsReducer/reviewsReducerReducer'
import viewReviewReducer from './viewReviewReducer/viewReviewReducerReducer'
import reviewApprovalReducer from './reviewApprovalReducer/reviewApprovalReducerReducer'
import reviewDraftReducer from './reviewDraftReducer/reviewDraftReducerReducer'
export default combineReducers({
    basicReducer,
    dashboardReducer,
    usersReducer,
    loginReducer,
    applicationActivityReducer,
    templateDetailReducer,
    reviewsReducer,
    reviewApprovalReducer,
    reviewDraftReducer,
    viewReviewReducer
})
