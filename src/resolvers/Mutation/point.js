exports.point = {
  addPoint (_, { studentId, value, classSessionId }, context) {
    if (value > 2 || value < -2) {
      throw new Error('Point values can range from -2 to 2')
    }
    return context.prisma.createPoint({
      value,
      student: {
        connect: {
          id: studentId
        }
      },
      classSession: {
        connect: {
          id: classSessionId
        }
      }
    })
  },
  undoPoint (_, args, context) {
    return context.prisma.deletePoint({ id: args.id })
  }
}
