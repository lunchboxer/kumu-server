exports.Tag = {
  materials (root, _, { prisma }) {
    return prisma.tag({ id: root.id }).materials()
  },
  lessons (root, _, { prisma }) {
    return prisma.tag({ id: root.id }).lessons()
  },
  words (root, _, { prisma }) {
    return prisma.tag({ id: root.id }).words()
  },
  async connections (root, _, { prisma }) {
    const lessonCount = await prisma.lessonsConnection({
      where: { tags_some: { id: root.id } }
    }).aggregate().count()
    const materialsCount = await prisma.materialsConnection({
      where: { tags_some: { id: root.id } }
    }).aggregate().count()
    const wordsCount = await prisma.wordsConnection({
      where: { tags_some: { id: root.id } }
    }).aggregate().count()
    return lessonCount + materialsCount + wordsCount
  }
}
