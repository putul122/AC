import {combineReducers} from 'redux'
import basicReducer from './basicReducer/basicReducerReducer'
import dashboardReducer from './dashboardReducer/dashboardReducerReducer'
import usersReducer from './usersReducer/usersReducerReducer'
import loginReducer from './loginReducer/loginReducerReducer'
import applicationActivityReducer from './applicationActivityReducer/applicationActivityReducerReducer'
import templateDetailReducer from './templateDetailReducer/templateDetailReducerReducer'
import templatesReducer from './templateReducer/templateReducerReducer'
import reviewsReducer from './reviewsReducer/reviewsReducerReducer'
import viewReviewReducer from './viewReviewReducer/viewReviewReducerReducer'
import conductReviewReducer from './conductReviewReducer/conductReviewReducerReducer'
import acceptReviewReducer from './acceptReviewReducer/acceptReviewReducerReducer'
import reviewApprovalReducer from './reviewApprovalReducer/reviewApprovalReducerReducer'
import reviewDraftReducer from './reviewDraftReducer/reviewDraftReducerReducer'
import discussionReducer from './discussionReducer/discussionReducerReducer'
import newDiscussionReducer from './newDiscussionReducer/newDiscussionReducerReducer'
export default combineReducers({
    basicReducer,
    dashboardReducer,
    usersReducer,
    loginReducer,
    applicationActivityReducer,
    templateDetailReducer,
    templatesReducer,
    reviewsReducer,
    conductReviewReducer,
    acceptReviewReducer,
    reviewApprovalReducer,
    reviewDraftReducer,
    viewReviewReducer,
    discussionReducer,
    newDiscussionReducer
})
