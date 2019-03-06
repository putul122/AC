import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppWrapper from '../../components/appWrapper/appWrapperComponent'
import { runWithAdal } from 'react-adal'
import {isAllowed} from '../../config/authorization'
import { authContext } from '../../config/adal'
const DO_NOT_LOGIN = false
let userRoles = localStorage.getItem('accessRight')

if (module.hot) {
  module.hot.accept()
}
export default class Root extends Component {
  constructor () {
    super()

    this.views = {}
  }

  loadView (fileName, props) {
    if (this.views[fileName]) {
      return this.views[fileName]
    }

    new Promise(resolve =>
      require.ensure([], require => {
        switch (fileName) {
          case 'handleAzure':
            if (module.hot) {
              module.hot.accept('../handleAzurePage/handleAzurePageRoute', () => {
                require('../handleAzurePage/handleAzurePageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../handleAzurePage/handleAzurePageRoute').default)
          break
          case 'home':
            if (module.hot) {
              module.hot.accept('../homePage/homePageRoute', () => {
                require('../homePage/homePageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../homePage/homePageRoute').default)
            break
          case 'dashboard':
            if (module.hot) {
              module.hot.accept('../dashboard/dashboardRoute', () => {
                require('../dashboard/dashboardRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../dashboard/dashboardRoute').default)
            break
          case 'templates':
            if (isAllowed(userRoles, ['Templates'])) {
              if (module.hot) {
                module.hot.accept('../templatesPage/templatesPageRoute', () => {
                  require('../templatesPage/templatesPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../templatesPage/templatesPageRoute').default)
            } else {
              localStorage.setItem('showAccessControlMessage', true)
              window.location.href = window.location.origin + '/dashboard'
            }
            break
          case 'templateDetail':
            if (isAllowed(userRoles, ['Templates'])) {
              if (module.hot) {
                module.hot.accept('../templateDetailPage/templateDetailPageRoute', () => {
                          require('../templateDetailPage/templateDetailPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../templateDetailPage/templateDetailPageRoute').default)
            } else {
              localStorage.setItem('showAccessControlMessage', true)
              window.location.href = window.location.origin + '/dashboard'
            }
            break
          case 'add_template':
            if (isAllowed(userRoles, ['Templates'])) {
              if (module.hot) {
                module.hot.accept('../addTemplatePage/addTemplatePageRoute', () => {
                  require('../addTemplatePage/addTemplatePageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../addTemplatePage/addTemplatePageRoute').default)
            } else {
              localStorage.setItem('showAccessControlMessage', true)
              window.location.href = window.location.origin + '/dashboard'
            }
            break
          case 'users':
            if (isAllowed(userRoles, ['Users'])) {
              if (module.hot) {
                module.hot.accept('../usersPage/usersPageRoute', () => {
                  require('../usersPage/usersPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../usersPage/usersPageRoute').default)
            } else {
              localStorage.setItem('showAccessControlMessage', true)
              window.location.href = window.location.origin + '/dashboard'
            }
            break
          case 'reviews':
            if (isAllowed(userRoles, ['Reviews'])) {
              if (module.hot) {
                module.hot.accept('../reviewsPage/reviewsPageRoute', () => {
                          require('../reviewsPage/reviewsPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../reviewsPage/reviewsPageRoute').default)
            } else {
              localStorage.setItem('showAccessControlMessage', true)
              window.location.href = window.location.origin + '/dashboard'
            }
            break
          case 'review_draft':
            if (isAllowed(userRoles, ['Draft'])) {
              if (module.hot) {
                module.hot.accept('../reviewDraftPage/reviewDraftPageRoute', () => {
                          require('../reviewDraftPage/reviewDraftPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../reviewDraftPage/reviewDraftPageRoute').default)
            } else {
              localStorage.setItem('showAccessControlMessage', true)
              window.location.href = window.location.origin + '/dashboard'
            }
            break
          case 'review_approval':
            if (isAllowed(userRoles, ['Approval'])) {
              if (module.hot) {
                module.hot.accept('../reviewApprovalPage/reviewApprovalPageRoute', () => {
                          require('../reviewApprovalPage/reviewApprovalPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../reviewApprovalPage/reviewApprovalPageRoute').default)
            } else {
              localStorage.setItem('showAccessControlMessage', true)
              window.location.href = window.location.origin + '/dashboard'
            }
            break
          case 'conduct_review':
            if (isAllowed(userRoles, ['InProgress'])) {
              if (module.hot) {
                module.hot.accept('../conductReviewPage/conductReviewPageRoute', () => {
                          require('../conductReviewPage/conductReviewPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../conductReviewPage/conductReviewPageRoute').default)
            } else {
              localStorage.setItem('showAccessControlMessage', true)
              window.location.href = window.location.origin + '/dashboard'
            }
            break
          case 'account':
            runWithAdal(authContext, () => {
              if (module.hot) {
                module.hot.accept('../accountPage/accountPageRoute', () => {
                  require('../accountPage/accountPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../accountPage/accountPageRoute').default)
            }, DO_NOT_LOGIN)
            break
          case 'viewReview':
            if (module.hot) {
              module.hot.accept('../viewReviewPage/viewReviewPageRoute', () => {
                require('../viewReviewPage/viewReviewPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../viewReviewPage/viewReviewPageRoute').default)
            break
          case 'acceptReview':
            if (isAllowed(userRoles, ['Acceptance'])) {
              if (module.hot) {
                module.hot.accept('../acceptReviewPage/acceptReviewPageRoute', () => {
                  require('../acceptReviewPage/acceptReviewPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../acceptReviewPage/acceptReviewPageRoute').default)
            } else {
              localStorage.setItem('showAccessControlMessage', true)
              window.location.href = window.location.origin + '/dashboard'
            }
            break
          case 'checkitems':
            if (isAllowed(userRoles, ['CheckItems'])) {
              if (module.hot) {
                module.hot.accept('../checkItemsPage/checkItemsPageRoute', () => {
                          require('../checkItemsPage/checkItemsPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../checkItemsPage/checkItemsPageRoute').default)
            } else {
              localStorage.setItem('showAccessControlMessage', true)
              window.location.href = window.location.origin + '/dashboard'
            }
            break
          case 'addcheckItem':
            if (isAllowed(userRoles, ['CheckItems'])) {
              if (module.hot) {
                module.hot.accept('../addcheckItemPage/addcheckItemPageRoute', () => {
                          require('../addcheckItemPage/addcheckItemPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../addcheckItemPage/addcheckItemPageRoute').default)
            } else {
              localStorage.setItem('showAccessControlMessage', true)
              window.location.href = window.location.origin + '/dashboard'
            }
            break
          case 'viewCheckItem':
            if (isAllowed(userRoles, ['CheckItems'])) {
              if (module.hot) {
                module.hot.accept('../viewcheckItemPage/viewcheckItemPageRoute', () => {
                  require('../viewcheckItemPage/viewcheckItemPageRoute').default // eslint-disable-line
                  this.forceUpdate()
                })
              }
              resolve(require('../viewcheckItemPage/viewcheckItemPageRoute').default)
            } else {
              localStorage.setItem('showAccessControlMessage', true)
              window.location.href = window.location.origin + '/dashboard'
            }
            break
          case 'review_artefact':
            if (module.hot) {
              module.hot.accept('../reviewArtefactPage/reviewArtefactPageRoute', () => {
                        require('../reviewArtefactPage/reviewArtefactPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../reviewArtefactPage/reviewArtefactPageRoute').default)
            break
          case 'landing':
            if (module.hot) {
              module.hot.accept('../landingPage/landingPageRoute', () => {
                        require('../landingPage/landingPageRoute').default // eslint-disable-line
                this.forceUpdate()
              })
            }
            resolve(require('../landingPage/landingPageRoute').default)
            break
          default:
            break
        }
      })
    )
      .then(View => {
        this.views[fileName] = <View {...props} />
      })
      .then(() => this.forceUpdate())
      .catch(err => {
        console.error(err)
        throw new Error(err)
      })

    return <div />
  }
  render () {
    return (
      <AppWrapper>
        <BrowserRouter>
          <Switch>
            <Route path='/dashboard' exact component={(props) => this.loadView('dashboard', props)} />
            <Route path='/users' exact component={(props) => this.loadView('users', props)} />
            <Route exact path='/templates' component={(props) => this.loadView('templates', props)} />
            <Route exact path='/templates/:id' component={(props) => this.loadView('templateDetail', props)} />
            <Route exact path='/add_template' component={(props) => this.loadView('add_template', props)} />
            <Route exact path='/account' component={(props) => this.loadView('account', props)} />
            <Route exact path='/handleAzure' component={(props) => this.loadView('handleAzure', props)} />
            <Route exact path='/reviews' component={(props) => this.loadView('reviews', props)} />
            <Route exact path='/review_draft/:id' component={(props) => this.loadView('review_draft', props)} />
            <Route exact path='/review_approval/:id' component={(props) => this.loadView('review_approval', props)} />
            <Route exact path='/conduct_review/:id' component={(props) => this.loadView('conduct_review', props)} />
            <Route exact path='/checkitems' component={(props) => this.loadView('checkitems', props)} />
            <Route exact path='/accept_review/:id' component={(props) => this.loadView('acceptReview', props)} />
            <Route exact path='/addcheckitem' component={(props) => this.loadView('addcheckItem', props)} />
            <Route exact path='/reviews/:id' component={(props) => this.loadView('viewReview', props)} />
            <Route exact path='/checkitems/:id' component={(props) => this.loadView('viewCheckItem', props)} />
            <Route exact path='/review_artefact/:id' component={(props) => this.loadView('review_artefact', props)} />
            <Route path='/' exact component={(props) => this.loadView('landing', props)} />
          </Switch>
        </BrowserRouter>
      </AppWrapper>
    )
  }
  // eslint-disable-line
  props: { // eslint-disable-line
    store: Object
  }
}
