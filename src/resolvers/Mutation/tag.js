exports.tag = {
  createTag (_, { name }, { prisma }) {
    return prisma.createTag({ name })
  },
  updateTag (_, { input, id }, { prisma }) {
    return prisma.updateTag({ data: { ...input }, where: { id } })
  },
  deleteTag (_, { id }, { prisma }) {
    return prisma.deleteTag({ id })
  }
}
