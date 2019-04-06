const { getUserId } = require('../utils')

exports.Query = {
  me (_, args, context) {
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
  users (_, args, context) {
    return context.prisma.users()
  },
  user (_, args, context) {
    return context.prisma.user({ id: args.id })
  },
  student (_, args, context) {
    return context.prisma.student({ id: args.id })
  },
  students (_, args, context) {
    const { orderBy, searchString } = args
    if (searchString) {
      return context.prisma.students({
        orderBy,
        where: {
          OR: [
            { chineseName_contains: searchString },
            { englishName_contains: searchString },
            { pinyinName_contains: searchString }
          ]
        }
      })
    }
    return context.prisma.students({ orderBy })
  },
  group (_, args, context) {
    return context.prisma.group({ id: args.id })
  },
  groups (_, args, context) {
    return context.prisma.groups()
  },
  semester (_, args, context) {
    return context.prisma.group({ id: args.id })
  },
  semesters (_, args, context) {
    return context.prisma.semesters({ orderBy: 'startDate_ASC' })
  },
  classSession (_, args, context) {
    return context.prisma.classSession({ id: args.id })
  },
  classSessions (_, { orderBy = 'startsAt_DESC', where }, context) {
    return context.prisma.classSessions({ orderBy, where })
  },
  points (_, args, context) {
    return context.prisma.points({ orderBy: 'createdAt_DESC' })
  },
  attendances (_, args, context) {
    return context.prisma.attendances({ orderBy: 'createdAt_DESC' })
  },
  // All the groups from the current and upcoming semester
  async activeGroups (_, args, context) {
    const now = new Date().toJSON()
    const current = await context.prisma.semesters({
      where: { AND: [{ startDate_lt: now }, { endDate_gt: now }] }
    })
    const next = await context.prisma.semesters({
      orderBy: 'startDate_ASC',
      first: 1,
      where: {
        startDate_gt: now
      }
    })
    return context.prisma.groups({
      where: { semester: { id_in: [current[0].id, next[0].id] } }
    })
  },
  async currentSemester (_, args, context) {
    const now = new Date().toJSON()
    const current = await context.prisma.semesters({
      where: { startDate_lt: now, endDate_gt: now }
    })
    return current[0]
  },
  async nextSemester (_, args, context) {
    const now = new Date().toJSON()
    const next = await context.prisma.semesters({
      orderBy: 'startDate_ASC',
      first: 1,
      where: {
        startDate_gt: now
      }
    })
    return next[0]
  }
}
