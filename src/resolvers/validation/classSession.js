exports.checkOrder = async (startsAt, endsAt, id, { prisma }) => {
  if (!startsAt && !endsAt) return false
  if (id && (!startsAt || !endsAt)) {
    const thisSession = await prisma.semester({ id })
    startsAt = !startsAt ? thisSession.startsAt : startsAt
    endsAt = !endsAt ? thisSession.endsAt : endsAt
  }
  if (startsAt >= endsAt) {
    throw new Error(`Start of session (${startsAt}) is after end (${endsAt})`)
  }
}

exports.checkConflicts = async (startsAt, endsAt, id, { prisma }) => {
  if (!startsAt && !endsAt) return false
  if (startsAt) {
    const startConflicts = await prisma.classSessions({
      where: {
        startsAt_lte: startsAt,
        endsAt_gte: startsAt,
        id_not: id
      }
    })
    if (startConflicts.length) {
      const startDate = new Date(startConflicts[0].startsAt)
      const endDate = new Date(startConflicts[0].endsAt)
      throw new Error(
        `Start time overlaps with a session on ${startDate.toDateString()} from ${startDate.toLocaleTimeString()} to ${endDate.toLocaleTimeString()}`
      )
    }
  }
  if (endsAt) {
    const endConflicts = await prisma.classSessions({
      where: { startsAt_lte: endsAt, endsAt_gte: endsAt, id_not: id }
    })
    if (endConflicts.length) {
      const startDate = new Date(endConflicts[0].startsAt)
      const endDate = new Date(endConflicts[0].endsAt)
      throw new Error(
        `End time overlaps with a session on ${endDate.toDateString()} from ${startDate.toLocaleTimeString()} to ${endDate.toLocaleTimeString()}`
      )
    }
  }

  // updating only one date
  // need to get both to check if surrounds another semester
  if (id && (!startsAt || !endsAt)) {
    const thisSession = await prisma.classSessions({ id })
    startsAt = !startsAt ? thisSession.startsAt : startsAt
    endsAt = !endsAt ? thisSession.endsAt : endsAt
  }
  if (endsAt && startsAt) {
    const insideConflicts = await prisma.classSessions({
      where: {
        startsAt_gte: startsAt,
        endsAt_lte: endsAt,
        id_not: id
      }
    })
    if (insideConflicts.length) {
      const startDate = new Date(insideConflicts[0].startsAt)
      const endDate = new Date(insideConflicts[0].endsAt)
      throw new Error(
        `Class session time include a session on ${startDate.toDateString()} from ${startDate.toLocaleTimeString()} to ${endDate.toLocaleTimeString()}`
      )
    }
  }
}

exports.withinYear = async (startsAt, endsAt) => {
  if (!startsAt && !endsAt) return false
  const now = new Date()
  const aYearFromNow = new Date(now.valueOf() + 3.154e10).toJSON()
  if (startsAt && startsAt > aYearFromNow) {
    throw new Error('Start time cannot be more than a year ahead.')
  }
  if (endsAt && endsAt > aYearFromNow) {
    throw new Error('End time cannot be more than a year ahead.')
  }
}

exports.duringSemester = async (startsAt, endsAt, groupId, { prisma }) => {
  if (groupId) return // duringGroupSemester will catch same thing
  if (!startsAt && !endsAt) return false
  const sameTimeSemesters = async date => {
    if (!date) return
    const startsinSemester = await prisma.$exists.semester({
      startDate_lte: date,
      endDate_gte: date
    })
    if (!startsinSemester) {
      throw new Error('Session must occur during an existing semester.')
    }
  }
  return Promise.all([sameTimeSemesters(startsAt), sameTimeSemesters(endsAt)])
}

exports.duringGroupSemester = async (startsAt, endsAt, groupId, { prisma }) => {
  if (!groupId) return
  const groupSemester = await prisma.group({ id: groupId }).semester()
  if (!groupSemester.startDate < startsAt && groupSemester.endDate > endsAt) {
    throw new Error(
      "Session must occur during the group's current enrolled semester"
    )
  }
}
