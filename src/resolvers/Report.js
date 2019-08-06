exports.Report = {
  materials (root, _, { prisma }) {
    return prisma.report({ id: root.id }).materials()
  },
  words (root, _, { prisma }) {
    return prisma.report({ id: root.id }).words()
  }
}
