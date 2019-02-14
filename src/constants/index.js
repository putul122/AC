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
  // getComponent: function (componentId) {
  //   return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId
  // },
  getComponent: function (componentId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId
  },
  getComponentProperty: function (componentId) {
      return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId + '/component_properties'
  },
  getComponentRelationships: function (componentId) {
      return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId + '/component_relationships'
  },
  getComponentConstraints: function (componentId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + componentId + '/constraints'
  },
  getComponentTypeComponents: function (componentTypeId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId + '/components'
  },
  getReviewArtefacts: function (componentTypeId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId + '/components'
  },
  getComponentTypeProperties: function (componentTypeId) {
    return 'https://model-eco-dev.ecoconductor.com/component_types/' + componentTypeId + '/component_type_properties'
  },
  getComponentTypeConstraints: function (componentTypeId) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + componentTypeId + '/constraints'
  },
  getComponentTypeRelations: function (payload) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/component_types/' + payload.componentTypeId + '/constraints?connection_type_id=' + payload.connectionTypeId
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
  getReviewArtefactProperties: function (id) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + id + '/component_properties'
  },
  getReviewArtefactRelationships: function (id) {
    return 'https://ecoconductor-dev-api-model.azurewebsites.net/components/' + id + '/component_relationships'
  },
  updateReview: function (reviewId) {
    return 'https://ac-eco-dev.ecoconductor.com/api/update/UpdateReview?review_id=' + reviewId
  },
  createDiscussion: 'https://notification-eco-dev.ecoconductor.com/discussions',
  createCheckItem: 'https://ac-eco-dev.ecoconductor.com/api/update/CreateCheckItemTemplate',
  getReviewTemplates: 'https://ac-eco-dev.ecoconductor.com/api/review/GetReviewTemplates',
  getReviewTemplate: 'https://ac-eco-dev.ecoconductor.com/api/review/GetReviewTemplate',
  createReviewTemplate: 'https://ac-eco-dev.ecoconductor.com/api/update/CreateReviewTemplate',
  updateReviewTemplate: function (reviewTemplateId) {
    return 'https://ac-eco-dev.ecoconductor.com/api/update/UpdateReviewTemplate?review_template_id=' + reviewTemplateId
  },
  getCheckItems: 'https://ac-eco-dev.ecoconductor.com/api/review/GetCheckItemTemplates',
  getCheckItem: 'https://ac-eco-dev.ecoconductor.com/api/review/GetCheckItemTemplate',
  deleteCheckitem: function (componentId) {
    return 'https://model-eco-dev.ecoconductor.com/components/' + componentId
  },
  updateCheckItem: function (checkItemTemplateId) {
    return 'https://ac-eco-dev.ecoconductor.com/api/update/UpdateCheckItemTemplate?check_item_template_id=' + checkItemTemplateId
  },
  deleteReviewTemplate: function (componentId) {
    return 'https://model-eco-dev.ecoconductor.com/components/' + componentId
  },
  documentReferenceLink: 'http://www.webfarm.telkom.co.za/bookshelf_II/systems/ae/show.asp?doc=',
  notificationURL: 'https://notification-eco-dev.ecoconductor.com/notification',
  iconURL: 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/',
  iconURL1: 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/1',
  iconURL18: 'https://ecoconductor-dev-api-resources.azurewebsites.net/icons/18',
  getTags: 'https://ac-eco-dev.ecoconductor.com/api/Review/GetTags'
}

export default api
