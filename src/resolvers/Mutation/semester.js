const { checkConflicts } = require('../validation/semester-date-conflicts')

exports.semester = {
  async createSemester (root, args, context) {
    await checkConflicts(
      args.input.startDate,
      args.input.endDate,
      null,
      context
    )
    return context.prisma.createSemester(args.input)
  },
  async updateSemester (root, args, context) {
    await checkConflicts(
      args.input.startDate,
      args.input.endDate,
      args.id,
      context
    )
    return context.prisma.updateSemester({
      data: args.input,
      where: { id: args.id }
    })
  },
  deleteSemester (root, args, context) {
    return context.prisma.deleteSemester({ id: args.id })
  }
}
