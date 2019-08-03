exports.Material = {
  tags (root, _, { prisma }) {
    return prisma.material({ id: root.id }).tags()
  }
}
