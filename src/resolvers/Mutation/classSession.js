const {
  checkOrder,
  checkConflicts,
  withinYear,
  duringSemester,
  duringGroupSemester
} = require('../validation/classSession')

exports.classSession = {
  async createClassSession (_, { groupId, input }, context) {
    await Promise.all([
      withinYear(input.startsAt, input.endsAt),
      checkOrder(input.startsAt, input.endsAt, null, context),
      duringGroupSemester(input.startsAt, input.endsAt, groupId, context),
      checkConflicts(input.startsAt, input.endsAt, null, context)
    ])
    return context.prisma.createClassSession({
      ...input,
      group: {
        connect: {
          id: groupId
        }
      }
    })
  },
  // to avoid running every validation
  async activateSession (_, { id }, context) {
    return context.prisma.updateClassSession({
      data: {
        stage: 'Active'
      },
      where: {
        id
      }
    })
  },
  async updateClassSession (_, { id, input, groupId }, context) {
    await Promise.all([
      withinYear(input.startsAt, input.endsAt),
      checkOrder(input.startsAt, input.endsAt, id, context),
      duringSemester(input.startsAt, input.endsAt, groupId, context),
      duringGroupSemester(input.startsAt, input.endsAt, groupId, context),
      checkConflicts(input.startsAt, input.endsAt, id, context)
    ])
    if (groupId) {
      return context.prisma.updateClassSession({
        data: {
          ...input,
          group: { connect: { id: groupId } }
        },
        where: { id }
      })
    }
    return context.prisma.updateClassSession({
      data: input,
      where: { id }
    })
  },
  deleteClassSession (_, { id }, context) {
    return context.prisma.deleteClassSession({ id })
  },
  createReport (_, { sessionId, input }, context) {
    return context.prisma.updateSession({
      where: { id: sessionId },
      data: { report: { create: input } }
    })
  },
  updateReport (_, { sessionId, input }, context) {
    return context.prisma.updateSession({
      where: { id: sessionId },
      data: { report: { update: input } }
    })
  },
  deleteReport (_, { sessionId }, context) {
    return context.prisma.updateSession({
      where: { id: sessionId },
      data: { report: { delete: true } }
    })
  }
}
