const {
  checkOrder,
  checkConflicts,
  withinYear,
  duringSemester
} = require('../validation/classSession')

exports.classSession = {
  async createClassSession (_, { groupId, input }, context) {
    await Promise.all([
      withinYear(input.startsAt, input.endsAt),
      checkOrder(input.startsAt, input.endsAt, null, context),
      duringSemester(input.startsAt, input.endsAt, context),
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
  async updateClassSession (_, { id, input, groupId }, context) {
    await Promise.all([
      withinYear(input.startsAt, input.endsAt),
      checkOrder(input.startsAt, input.endsAt, id, context),
      duringSemester(input.startsAt, input.endsAt, context),
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
  }
}
