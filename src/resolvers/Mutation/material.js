exports.material = {
  createMaterial (_, { input }, { prisma }) {
    return prisma.createMaterial({ input })
  },
  updateMaterial (_, { input, id }, { prisma }) {
    return prisma.updateMaterial({ data: { input }, where: { id } })
  },
  deleteMaterial (_, { id }, { prisma }) {
    return prisma.deleteMaterial({ id })
  }
}
