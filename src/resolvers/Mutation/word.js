exports.word = {
  createWord (_, { input }, { prisma }) {
    return prisma.createWord({ ...input })
  },
  updateWord (_, { input, id }, { prisma }) {
    return prisma.updateWord({ data: { ...input }, where: { id } })
  },
  deleteWord (_, { id }, { prisma }) {
    return prisma.deleteWord({ id })
  }
}
