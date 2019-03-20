const { getUserId } = require('../utils')

exports.Query = {
  me (root, args, context) {
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
  users (root, args, context) {
    return context.prisma.users()
  },
  user (root, args, context) {
    return context.prisma.user({ id: args.id })
  },
  student (root, args, context) {
    return context.prisma.student({ id: args.id })
  },
  students (root, args, context) {
    return context.prisma.students()
  },
  group (root, args, context) {
    return context.prisma.group({ id: args.id })
  },
  groups (root, args, context) {
    return context.prisma.groups()
  },
  semester (root, args, context) {
    return context.prisma.group({ id: args.id })
  },
  semesters (root, args, context) {
    return context.prisma.semesters()
  },
  classSession (root, args, context) {
    return context.prisma.classSession({ id: args.id })
  },
  classSessions (root, args, context) {
    return context.prisma.classSessions()
  },
  points (root, args, context) {
    return context.prisma.points({ orderBy: 'createdAt_DESC' })
  }
}
