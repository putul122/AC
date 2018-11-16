import watchBasic, {actionCreators as basicActions} from './basic/basicSaga'
import watchApplications, {actionCreators as applicationActions} from './application/applicationSaga'
import watchReviews, {actionCreators as reviewActions} from './review/reviewSaga'
import watchTemplates, {actionCreators as templateActions} from './template/templateSaga'
import watchSoftwares, {actionCreators as softwareActions} from './software/softwareSaga'
import watchEntitlements, {actionCreators as entitlementActions} from './entitlement/entitlementSaga'
import watchLoginUser, {actionCreators as loginActions} from './login/loginSaga'
import watchApplicationActivity, {actionCreators as applicationActivityActions} from './applicationActivity/applicationActivitySaga'
import watchUserActions, {actionCreators as userActions} from './user/userSaga'
import watchDiscussions, {actionCreators as discussionActions} from './discussion/discussionSaga'

export const actions = {
  basicActions,
  applicationActions,
  reviewActions,
  softwareActions,
  entitlementActions,
  loginActions,
  applicationActivityActions,
  userActions,
  templateActions,
  discussionActions
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
    watchDiscussions()
  ]
}
