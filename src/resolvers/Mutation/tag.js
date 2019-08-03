exports.tag = {
  createTag (_, { name, id }, { prisma }) {
    prisma.createTag({ id })
  },
  updateTag (_, { name, id }, { prisma }) {
    prisma.updateTag({ data: { name }, where: { id } })
  },
  deleteTag (_, { id }, { prisma }) {
    prisma.deleteTag({ id })
  }
}
