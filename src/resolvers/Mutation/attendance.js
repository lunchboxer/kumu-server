const attendance = {
  async markRestAbsent (_, { classSessionId }, context) {
    const students = await context.prisma
      .classSession({ id: classSessionId })
      .group()
      .students({
        where: { attendances_none: { classSession: { id: classSessionId } } }
      })
    students.forEach(async student => {
      // some indication of whether or not failed instead of always return true
      const studentId = student.id
      const status = 'Absent'
      attendance.updateAttendance(
        _,
        { classSessionId, studentId, status },
        context
      )
    })
    return true
  },
  async markAllPresent (_, { classSessionId }, context) {
    const students = await context.prisma
      .classSession({ id: classSessionId })
      .group()
      .students({
        where: {
          attendances_none: {
            classSession: { id: classSessionId },
            status: 'Present'
          }
        }
      })
    students.forEach(async student => {
      // some indication of whether or not failed instead of always return true
      const studentId = student.id
      const status = 'Present'
      attendance.updateAttendance(
        _,
        { classSessionId, studentId, status },
        context
      )
    })
    return true
  },
  async updateAttendance (_, { classSessionId, studentId, status }, context) {
    let arrivedAt
    if (['Present', 'Late'].includes(status)) arrivedAt = new Date()
    if (status === 'Absent') arrivedAt = null
    const updated = await context.prisma.updateManyAttendances({
      data: { status, arrivedAt },
      where: {
        student: { id: studentId },
        classSession: { id: classSessionId }
      }
    })
    if (updated.count > 0) return true
    const result = await context.prisma.createAttendance({
      classSession: { connect: { id: classSessionId } },
      student: { connect: { id: studentId } },
      status,
      arrivedAt
    })
    return !!result
  }
}

module.exports = { attendance }
