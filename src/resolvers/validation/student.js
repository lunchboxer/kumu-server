// Student can only belong to one group per semester
exports.oneGroupPerSemester = async (studentId, newGroupId, oldGroupId, { prisma }) => {
  const semester = await prisma.group({ id: newGroupId }).semester()
  const otherGroups = await prisma.student({ id: studentId })
    .groups({
      where: { semester: { id: semester.id }, id_not_in: [newGroupId, oldGroupId || ''] }
    })
  if (otherGroups.length > 0) {
    throw new Error(`Student can only belong to one group per semester`)
  }
}
