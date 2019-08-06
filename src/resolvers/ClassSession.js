exports.ClassSession = {
  attendances (root, _, { prisma }) {
    return prisma.classSession({ id: root.id }).attendances()
  },
  group (root, _, { prisma }) {
    return prisma.classSession({ id: root.id }).group()
  },
  points (root, _, { prisma }) {
    return prisma.classSession({ id: root.id }).points()
  },
  report (root, _, { prisma }) {
    return prisma.classSession({ id: root.id }).report()
  },
  lesson (root, _, { prisma }) {
    return prisma.classSession({ id: root.id }).lesson()
  },
  async number (root, _, { prisma }) {
    const group = await prisma.classSession({ id: root.id }).group()
    const semester = await prisma.classSession({ id: root.id })
      .group()
      .semester()
    const lessons = await prisma.classSessionsConnection({
      where: {
        group: {
          id: group.id
        },
        startsAt_gte: semester.startDate,
        endsAt_lte: semester.endDate,
        startsAt_lt: root.startsAt
      }
    })
      .aggregate()
      .count()
    return lessons + 1
  }
}
