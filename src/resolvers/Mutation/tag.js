exports.tag = {
  createTag (_, { name }, { prisma }) {
    return prisma.createTag({ name })
  },
  updateTag (_, { name, id }, { prisma }) {
    return prisma.updateTag({ data: { name }, where: { id } })
  },
  deleteTag (_, { id }, { prisma }) {
    return prisma.deleteTag({ id })
  }
}
