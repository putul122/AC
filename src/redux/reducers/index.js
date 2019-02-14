import {combineReducers} from 'redux'
import basicReducer from './basicReducer/basicReducerReducer'
import dashboardReducer from './dashboardReducer/dashboardReducerReducer'
import usersReducer from './usersReducer/usersReducerReducer'
import loginReducer from './loginReducer/loginReducerReducer'
import applicationActivityReducer from './applicationActivityReducer/applicationActivityReducerReducer'
import templateDetailReducer from './templateDetailReducer/templateDetailReducerReducer'
import addTemplateReducer from './addTemplateReducer/addTemplateReducerReducer'
import templatesReducer from './templateReducer/templateReducerReducer'
import reviewsReducer from './reviewsReducer/reviewsReducerReducer'
import viewReviewReducer from './viewReviewReducer/viewReviewReducerReducer'
import viewcheckItemReducer from './viewcheckItemReducer/viewcheckItemReducerReducer'
import addcheckItemReducer from './addcheckItemReducer/addcheckItemReducerReducer'
import checkItemsReducer from './checkItemsReducer/checkItemsReducerReducer'
import conductReviewReducer from './conductReviewReducer/conductReviewReducerReducer'
import acceptReviewReducer from './acceptReviewReducer/acceptReviewReducerReducer'
import reviewApprovalReducer from './reviewApprovalReducer/reviewApprovalReducerReducer'
import reviewDraftReducer from './reviewDraftReducer/reviewDraftReducerReducer'
import discussionReducer from './discussionReducer/discussionReducerReducer'
import newDiscussionReducer from './newDiscussionReducer/newDiscussionReducerReducer'
import checkItemModalReducer from './checkItemModalReducer/checkItemModalReducerReducer'
import reviewArtefactReducer from './reviewArtefactReducer/reviewArtefactReducerReducer'
import signUpReducer from './signUpReducer/signUpReducerReducer'
import componentModalViewReducer from './componentModalViewReducer/componentModalViewReducerReducer'
import attachmentsReducer from './attachmentsReducer/attachmentsReducerReducer'
import viewAttachmentsReducer from './viewAttachmentsReducer/viewAttachmentsReducerReducer'

export default combineReducers({
    basicReducer,
    dashboardReducer,
    usersReducer,
    loginReducer,
    applicationActivityReducer,
    templateDetailReducer,
    addTemplateReducer,
    templatesReducer,
    reviewsReducer,
    conductReviewReducer,
    acceptReviewReducer,
    checkItemsReducer,
    reviewApprovalReducer,
    reviewDraftReducer,
    viewcheckItemReducer,
    addcheckItemReducer,
    viewReviewReducer,
    discussionReducer,
    newDiscussionReducer,
    reviewArtefactReducer,
    signUpReducer,
    checkItemModalReducer,
    componentModalViewReducer,
    attachmentsReducer,
    viewAttachmentsReducer
})
