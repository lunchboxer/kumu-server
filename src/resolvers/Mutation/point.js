exports.point = {
  addPoint (root, { input }, context) {
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
  undoPoint (root, args, context) {
    return context.prisma.deletePoint({ id: args.id })
  }
}
