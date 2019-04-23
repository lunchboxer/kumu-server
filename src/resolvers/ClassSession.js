exports.ClassSession = {
  attendances (root, args, context) {
    return context.prisma.classSession({ id: root.id }).attendances()
  },
  group (root, args, context) {
    return context.prisma.classSession({ id: root.id }).group()
  },
  points (root, args, context) {
    return context.prisma.classSession({ id: root.id }).points()
  },
  async number (root, args, context) {
    const group = await context.prisma.classSession({ id: root.id }).group()
    const semester = await context.prisma
      .classSession({ id: root.id })
      .group()
      .semester()
    const lessons = await context.prisma
      .classSessionsConnection({
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
