exports.point = {
  addPoint (_, { input }, context) {
    if (input.value > 2 || input.value < -2) {
      throw new Error('Point values can range from -2 to 2')
    }
    return context.prisma.createPoint({
      value: input.value,
      student: {
        connect: {
          id: input.studentId
        }
      },
      classSession: {
        connect: {
          id: input.classSessionId
        }
      }
    })
  },
  undoPoint (_, args, context) {
    return context.prisma.deletePoint({ id: args.id })
  }
}
