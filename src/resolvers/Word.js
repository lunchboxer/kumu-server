exports.Word = {
  tags (root, _, { prisma }) {
    return prisma.word({ id: root.id }).tags()
  },
  lessons (root, _, { prisma }) {
    return prisma.word({ id: root.id }).lessons()
  }
}
