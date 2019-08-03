exports.lesson = {
  createLesson (_, { input }, { prisma }) {
    return prisma.createLesson({ ...input })
  },
  updateLesson (_, { input, id }, { prisma }) {
    return prisma.updateLesson({ data: input, where: { id } })
  },
  deleteLesson (_, { id }, { prisma }) {
    return prisma.deleteLesson({ id })
  }
}
