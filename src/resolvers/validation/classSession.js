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
        // new startsAt is during existing session
        AND: [
          { startsAt_lte: startsAt },
          { endsAt_gte: startsAt },
          { id_not: id }
        ]
      }
    })
    if (startConflicts.length) {
      const startDate = new Date(startsAt)
      const endDate = new Date(endsAt)
      throw new Error(
        `Start time overlaps with a session on ${startDate.toDateString()} from ${startDate.toLocaleTimeString()} to ${endDate.toLocaleTimeString()}`
      )
    }
  }
  if (endsAt) {
    const endConflicts = await prisma.classSessions({
      where: {
        // new endsAt is during existing session
        AND: [{ startDate_lte: endsAt }, { endsAt_gte: endsAt }, { id_not: id }]
      }
    })
    if (endConflicts.length) {
      const startDate = new Date(startsAt)
      const endDate = new Date(endsAt)
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
        AND: [
          { startsAt_gte: startsAt },
          { endsAt_lte: endsAt },
          { id_not: id }
        ]
      }
    })
    if (insideConflicts.length) {
      const startDate = new Date(startsAt)
      const endDate = new Date(endsAt)
      throw new Error(
        `Class session time include a session on ${startDate.toDateString()} from ${startDate.toLocaleTimeString()} to ${endDate.toLocaleTimeString()}`
      )
    }
  }
}
