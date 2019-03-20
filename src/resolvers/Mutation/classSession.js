exports.classSession = {
  createClassSession (root, args, context) {
    return context.prisma.createClassSession({
      ...args.input,
      group: {
        connect: {
          id: args.groupId
        }
      }
    })
  },
  updateClassSession (root, { id, input, groupId }, context) {
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
