exports.lesson = {
  createLesson(_, { input }, { prisma }) {
    return prisma.createLesson({ ...input })
  },
  updateLesson(_, { input, id }, { prisma }) {
    return prisma.updateLesson({ date: input, where: { id } })
  }
}
