const applicationRules = {
    'Compliance Review Administrator': ['Draft', 'Acceptance', 'InProgress', 'Approval', 'Reviews', 'CheckItems', 'Templates', 'Users'],
    'Enterprise Architect': ['Draft', 'Acceptance', 'InProgress', 'Reviews'],
    'Enterprise Architect Manager': ['Acceptance', 'Approval', 'Reviews']
}

export const hasRole = (userRoles, roles) => {
    userRoles = atob(userRoles)
    userRoles = userRoles.split(',')
    return userRoles.some(role => applicationRules.hasOwnProperty(role))
}

export const isAllowed = (userRoles, rights) => {
    userRoles = atob(userRoles)
    console.log('userRoles', userRoles)
    let roles = userRoles.split(',')
    if (roles.length > 0) {
        let userRights = []
        roles.forEach(userRole => {
            if (applicationRules.hasOwnProperty(userRole)) {
                Array.prototype.push.apply(userRights, applicationRules[userRole])
            }
        })
        console.log('userRights', userRights)
        console.log('rights', rights)
        console.log('test', rights.some(right => userRights.includes(right)))
        return rights.some(right => userRights.includes(right))
    } else {
        return false
    }
}
