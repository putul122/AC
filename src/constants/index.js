const api = {
  clientAccessToken: 'https://ecoconductor-dev-api-discovery.azurewebsites.net/client_access_token',
  loginUser: 'https://ecoconductor-dev-api-account.azurewebsites.net/user_access_token',
  authenticateUser: 'https://ecoconductor-dev-api-account.azurewebsites.net/user_access_token',
  getExternalUsers: 'https://account-eco-dev.ecoconductor.com/external_users',
  createUser: 'https://account-eco-dev.ecoconductor.com/users',
  // getUser: 'https://account-eco-dev.ecoconductor.com/users',
  getUser: function (userId) {
    return 'https://account-eco-dev.ecoconductor.com/users/' + userId
  },
  deleteUser: function (userId) {
    return 'https://account-eco-dev.ecoconductor.com/users/' + userId
  },
  getRoles: 'https://account-eco-dev.ecoconductor.com/roles',
  getComponent: function (componentId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId
  },
  getComponentConstraints: function (componentId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId + '/constraints'
  },
  getComponentTypeComponents: function (componentTypeId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId + '/components'
  },
  getComponentTypeConstraints: function (componentTypeId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId + '/constraints'
  },
  updateComponent: function (payload) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + payload.componentId
  },
  updateComponentRelationships: function (componentId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId + '/component_relationships'
  },
  getDiscussions: 'https://ecoconductor-dev-api-notification.azurewebsites.net/discussions',
  getDiscussionMessages: function (id) {
      return 'https://ecoconductor-dev-api-notification.azurewebsites.net/discussions/' + id + '/messages'
  },
  getAccountArtefacts: 'https://account-eco-dev.ecoconductor.com/artefacts',
  getModelArtefacts: 'https://model-eco-dev.ecoconductor.com/artefacts',
  updateNotificationViewStatus: 'https://notification-eco-dev.ecoconductor.com/notification_view_status',
  getActivityMessage: function () {
    return 'https://ecoconductor-dev-api-notification.azurewebsites.net/messages'
  },
  getPackage: 'https://model-eco-dev.ecoconductor.com/model_packages/AC',
  getReviews: 'https://ac-eco-dev.ecoconductor.com/api/review/GetReviews',
  getReviewsSummary: 'https://ac-eco-dev.ecoconductor.com/api/review/GetReviewsSummary',
  getReview: 'https://ac-eco-dev.ecoconductor.com/api/review/GetReview/',
  createReview: 'https://ac-eco-dev.ecoconductor.com/api/update/CreateReview',
  updateReview: 'https://ac-eco-dev.ecoconductor.com/api/update/UpdateReview',
  createDiscussion: 'https://notification-eco-dev.ecoconductor.com/discussions',
  getReviewTemplates: 'https://ac-eco-dev.ecoconductor.com/api/review/GetReviewTemplates',
  getReviewTemplate: 'https://ac-eco-dev.ecoconductor.com/api/review/GetReviewTemplate',
  createReviewTemplate: 'https://ac-eco-dev.ecoconductor.com/api/update/CreateReviewTemplate',
  updateReviewTemplate: 'https://ac-eco-dev.ecoconductor.com/api/update/UpdateReviewTemplate'
}

export default api
