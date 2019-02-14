import watchBasic, {actionCreators as basicActions} from './basic/basicSaga'
import watchApplications, {actionCreators as applicationActions} from './application/applicationSaga'
import watchReviews, {actionCreators as reviewActions} from './review/reviewSaga'
import watchTemplates, {actionCreators as templateActions} from './template/templateSaga'
import watchSoftwares, {actionCreators as softwareActions} from './software/softwareSaga'
import watchEntitlements, {actionCreators as entitlementActions} from './entitlement/entitlementSaga'
import watchLoginUser, {actionCreators as loginActions} from './login/loginSaga'
import watchCreateUser, {actionCreators as signUpActions} from './signUp/signUpSaga'
import watchApplicationActivity, {actionCreators as applicationActivityActions} from './applicationActivity/applicationActivitySaga'
import watchUserActions, {actionCreators as userActions} from './user/userSaga'
import watchDiscussions, {actionCreators as discussionActions} from './discussion/discussionSaga'
import watchCheckItems, {actionCreators as checkitemActions} from './checkItem/checkItemSaga'
import watchComponentModalView, {actionCreators as componentModalViewActions} from './componentModalView/componentModalViewSaga'
import watchAttachments, {actionCreators as attachmentsActions} from './attachments/attachmentsSaga'

export const actions = {
  basicActions,
  applicationActions,
  signUpActions,
  reviewActions,
  softwareActions,
  entitlementActions,
  loginActions,
  applicationActivityActions,
  userActions,
  templateActions,
  discussionActions,
  checkitemActions,
  componentModalViewActions,
  attachmentsActions
}
export default function * rootSaga () {
  yield [
    watchBasic(),
    watchApplications(),
    watchReviews(),
    watchSoftwares(),
    watchEntitlements(),
    watchLoginUser(),
    watchApplicationActivity(),
    watchUserActions(),
    watchTemplates(),
    watchCreateUser(),
    watchDiscussions(),
    watchCheckItems(),
    watchComponentModalView(),
    watchAttachments()
  ]
}
