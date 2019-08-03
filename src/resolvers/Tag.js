exports.Tag = {
  materials (root, _, { prisma }) {
    return prisma.tag({ id: root.id }).materials()
  },
  lessons (root, _, { prisma }) {
    return prisma.tag({ id: root.id }).lessons()
  },
  words (root, _, { prisma }) {
    return prisma.tag({ id: root.id }).words()
  }
}
