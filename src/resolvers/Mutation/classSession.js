const { checkOrder, checkConflicts } = require('../validation/classSession')

exports.classSession = {
  async createClassSession (_, { groupId, input }, context) {
    await checkOrder(input.startsAt, input.endsAt, null, context)
    await checkConflicts(input.startsAt, input.endsAt, null, context)
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
    await checkOrder(input.startsAt, input.endsAt, id, context)
    await checkConflicts(input.startsAt, input.endsAt, id, context)
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
  }
}
