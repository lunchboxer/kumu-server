const { rule, shield, or } = require('graphql-shield')
const { getUserId } = require('./utils')

// Rules

const isAuthenticatedUser = rule()((parent, args, context) => {
  const userId = getUserId(context)
  return Boolean(userId)
})
const isAdmin = rule()((parent, args, context) => {
  const userId = getUserId(context)
  return context.prisma.$exists.user({ id: userId, role: 'Admin' })
})
const isThisUser = rule()((parent, args, context) => {
  const userId = getUserId(context)
  return userId === context.id
})
const noUsersExist = rule()(async (parent, args, context) => {
  const users = await context.prisma.$exists.user()
  return !users
})

// Permissions

exports.permissions = shield({
  Query: {
    me: isAuthenticatedUser
  },
  Mutation: {
    createUser: or(isAdmin, noUsersExist),
    deleteUser: isAdmin,
    updateUser: or(isThisUser, isAdmin),
    changePassword: or(isThisUser, isAdmin),
    createClassSession: isAuthenticatedUser,
    updateClassSession: isAuthenticatedUser,
    addPoint: isAuthenticatedUser,
    undoPoint: isAuthenticatedUser,
    updateSemester: isAdmin,
    deleteSemester: isAdmin,
    createSemester: isAdmin,
    createStudent: isAuthenticatedUser,
    updateStudent: isAuthenticatedUser,
    deleteStudent: isAuthenticatedUser
  },
  User: {
    role: isAdmin
  }
})
