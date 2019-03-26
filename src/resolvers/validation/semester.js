exports.checkOrder = async (startDate, endDate, id, { prisma }) => {
  if (!startDate && !endDate) return false
  if (id && (!startDate || !endDate)) {
    const thisSemester = await prisma.semester({ id })
    startDate = !startDate ? thisSemester.startDate : startDate
    endDate = !endDate ? thisSemester.endDate : endDate
  }
  if (startDate >= endDate) {
    throw new Error(`Start date (${startDate}) is after end date (${endDate})`)
  }
}

exports.checkConflicts = async (startDate, endDate, id, { prisma }) => {
  if (!startDate && !endDate) return false
  if (startDate) {
    const startConflicts = await prisma.semesters({
      where: {
        // new startDate is during existing semester
        AND: [
          { startDate_lte: startDate },
          { endDate_gte: startDate },
          { id_not: id }
        ]
      }
    })
    if (startConflicts.length) {
      throw new Error(
        `Start date overlaps with semester '${startConflicts[0].name}'`
      )
    }
  }
  if (endDate) {
    const endConflicts = await prisma.semesters({
      where: {
        // new endDate is during existing semester
        AND: [
          { startDate_lte: endDate },
          { endDate_gte: endDate },
          { id_not: id }
        ]
      }
    })
    if (endConflicts.length) {
      throw new Error(
        `End date overlaps with semester '${endConflicts[0].name}'`
      )
    }
  }

  // updating only one date
  // need to get both to check if surrounds another semester
  if (id && (!startDate || !endDate)) {
    const thisSemester = await prisma.semester({ id })
    startDate = !startDate ? thisSemester.startDate : startDate
    endDate = !endDate ? thisSemester.endDate : endDate
  }
  if (endDate && startDate) {
    const insideConflicts = await prisma.semesters({
      where: {
        AND: [
          { startDate_gte: startDate },
          { endDate_lte: endDate },
          { id_not: id }
        ]
      }
    })
    if (insideConflicts.length) {
      throw new Error(`Dates include semester '${insideConflicts[0].name}'`)
    }
  }
}
