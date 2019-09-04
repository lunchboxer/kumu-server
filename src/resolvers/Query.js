const { getUserId } = require('../utils')

exports.Query = {
  me (_, arguments_, context) {
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
  users (_, arguments_, context) {
    return context.prisma.users()
  },
  user (_, arguments_, context) {
    return context.prisma.user({ id: arguments_.id })
  },
  student (_, arguments_, context) {
    return context.prisma.student({ id: arguments_.id })
  },
  students (_, arguments_, context) {
    const { orderBy, searchString, where } = arguments_
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
    return context.prisma.students({ orderBy, where })
  },
  group (_, input, context) {
    return context.prisma.group({ id: input.id })
  },
  groups (_, { where, orderBy }, context) {
    return context.prisma.groups({ orderBy, where })
  },
  semester (_, arguments_, context) {
    return context.prisma.group({ id: arguments_.id })
  },
  semesters (_, arguments_, context) {
    return context.prisma.semesters({ orderBy: 'startDate_DESC' })
  },
  classSession (_, arguments_, context) {
    return context.prisma.classSession({ id: arguments_.id })
  },
  classSessions (_, { orderBy = 'startsAt_DESC', where }, context) {
    return context.prisma.classSessions({ orderBy, where })
  },
  points (_, { where }, context) {
    return context.prisma.points({ orderBy: 'createdAt_DESC', where })
  },
  attendances (_, { where, orderBy }, context) {
    return context.prisma.attendances({ orderBy: 'createdAt_DESC', where })
  },
  // All the groups from the current and upcoming semester
  async activeGroups (_, arguments_, context) {
    const now = new Date().toJSON()
    const current = await context.prisma.semesters({
      where: { startDate_lt: now, endDate_gt: now }
    })
    const next = await context.prisma.semesters({
      orderBy: 'startDate_ASC',
      first: 1,
      where: {
        startDate_gt: now
      }
    })
    const ids = []
    current[0] && ids.push(current[0].id)
    next[0] && ids.push(next[0].id)
    return context.prisma.groups({
      where: { semester: { id_in: ids } }
    })
  },
  async currentSemester (_, arguments_, context) {
    const now = new Date().toJSON()
    const current = await context.prisma.semesters({
      where: { startDate_lt: now, endDate_gt: now }
    })
    return current[0]
  },
  async nextSemester (_, arguments_, context) {
    const now = new Date().toJSON()
    const next = await context.prisma.semesters({
      orderBy: 'startDate_ASC',
      first: 1,
      where: {
        startDate_gt: now
      }
    })
    return next[0]
  },
  lesson (_, { id }, { prisma }) {
    return prisma.lesson({ id })
  },
  lessons (_, { where, orderBy }, { prisma }) {
    return prisma.lessons({ where, orderBy })
  },
  material (_, { id }, { prisma }) {
    return prisma.material({ id })
  },
  materials (_, { where, orderBy }, { prisma }) {
    return prisma.materials({ where, orderBy })
  },
  word (_, { id }, { prisma }) {
    return prisma.word({ id })
  },
  words (_, { where, orderBy }, { prisma }) {
    return prisma.words({ where, orderBy })
  },
  tag (_, { id }, { prisma }) {
    return prisma.tag({ id })
  },
  tags (_, arguments_, { prisma }) {
    return prisma.tags({ orderBy: 'name_ASC' })
  }
}
