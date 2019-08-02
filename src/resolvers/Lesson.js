exports.Lesson = {
  materials (root, _, { prisma }) {
    return prisma.lesson({ id: root.id }).materials()
  },
  tags (root, _, { prisma }) {
    return prisma.lesson({ id: root.id }).tags()
  },
  words (root, _, { prisma }) {
    return prisma.lesson({ id: root.id }).words()
  }
}
