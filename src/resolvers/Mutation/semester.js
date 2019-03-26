const { checkConflicts, checkOrder } = require('../validation/semester')

exports.semester = {
  async createSemester (_, args, context) {
    await checkOrder(args.input.startDate, args.input.endDate, null, context)
    await checkConflicts(
      args.input.startDate,
      args.input.endDate,
      null,
      context
    )
    return context.prisma.createSemester(args.input)
  },
  async updateSemester (_, args, context) {
    await checkOrder(args.input.startDate, args.input.endDate, args.id, context)
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
  deleteSemester (_, args, context) {
    return context.prisma.deleteSemester({ id: args.id })
  }
}
