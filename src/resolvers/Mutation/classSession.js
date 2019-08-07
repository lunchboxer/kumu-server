const {
  checkOrder,
  checkConflicts,
  withinYear,
  duringSemester,
  duringGroupSemester
} = require('../validation/classSession')

exports.classSession = {
  async createClassSession (_, { groupId, input, lessonId }, context) {
    await Promise.all([
      withinYear(input.startsAt, input.endsAt),
      checkOrder(input.startsAt, input.endsAt, null, context),
      duringGroupSemester(input.startsAt, input.endsAt, groupId, context),
      checkConflicts(input.startsAt, input.endsAt, null, context)
    ])
    return context.prisma.createClassSession({
      ...input,
      group: { connect: { id: groupId } },
      lesson: { connect: { id: lessonId } }
    })
  },
  // to avoid running every validation
  async activateSession (_, { id }, context) {
    return context.prisma.updateClassSession({
      data: {
        stage: 'Active'
      },
      where: {
        id
      }
    })
  },
  async updateClassSession (_, { id, input, groupId, lessonId }, context) {
    await Promise.all([
      withinYear(input.startsAt, input.endsAt),
      checkOrder(input.startsAt, input.endsAt, id, context),
      duringSemester(input.startsAt, input.endsAt, groupId, context),
      duringGroupSemester(input.startsAt, input.endsAt, groupId, context),
      checkConflicts(input.startsAt, input.endsAt, id, context)
    ])
    const data = input
    if (groupId) input.group = { connect: { id: groupId } }
    if (lessonId) input.lesson = { connect: { id: lessonId } }
    return context.prisma.updateClassSession({ data, where: { id } })
  },
  addLessonToClassSession (_, { id, lessonId }, context) {
    return context.prisma.updateClassSession({
      data: { lesson: { connect: { id: lessonId } } },
      where: { id }
    })
  },
  deleteClassSession (_, { id }, context) {
    return context.prisma.deleteClassSession({ id })
  },
  async createReport (_, { classSessionId }, context) {
    const lesson = await context.prisma.classSession({ id: classSessionId }).lesson()
    const words = await context.prisma.lesson({ id: lesson.id }).words()
    const wordIds = words.map(w => {
      return { id: w.id }
    })
    const materials = await context.prisma.lesson({ id: lesson.id }).materials()
    const materialIds = materials.map(m => {
      return { id: m.id }
    })
    if (!lesson) {
      throw new Error('You must add a lesson to the session before creating a report.')
    }
    const { homeworkEN, homeworkZH, summaryEN, summaryZH } = lesson
    const data = {
      report: {
        create: {
          homeworkZH,
          homeworkEN,
          summaryEN,
          summaryZH,
          published: false,
          words: { connect: wordIds },
          materials: { connect: materialIds }
        }
      }
    }
    return context.prisma.updateClassSession({ data, where: { id: classSessionId } })
  },
  updateReport (_, { sessionId, input }, context) {
    return context.prisma.updateSession({
      where: { id: sessionId },
      data: { report: { update: input } }
    })
  },
  deleteReport (_, { sessionId }, context) {
    return context.prisma.updateSession({
      where: { id: sessionId },
      data: { report: { delete: true } }
    })
  }
}
