const { isLeapYear, isPast, differenceInCalendarDays } = require('date-fns')

exports.Student = {
  groups (root, args, context) {
    return context.prisma.student({ id: root.id }).groups()
  },
  points (root, args, context) {
    return context.prisma.student({ id: root.id }).points()
  },
  async pointsTally (root, args, context) {
    const points = await context.prisma.student({ id: root.id }).points()
    return points.reduce((sum, point) => {
      return sum + point.value
    }, 0)
  },
  async daysToBirthday (root, args, { prisma }) {
    const student = await prisma.student({ id: root.id })
    if (!student.birthdate) return null
    // check if the date is before or after earliest limmit
    const now = new Date()
    const birthdate = new Date(student.birthdate)
    const birthMonth = birthdate.getMonth() + 1
    const birthDate = birthdate.getDate()
    let nextBirthDay
    let isLeapBaby = false
    if (birthMonth === now.getMonth() + 1 && birthDate === now.getDate()) return 0
    if (birthMonth === 2 && birthDate === 29) isLeapBaby = true
    if (isLeapBaby && !isLeapYear(now)) {
      nextBirthDay = new Date(now.getFullYear(), 2, 1)
    } else {
      nextBirthDay = new Date(student.birthdate).setFullYear(now.getFullYear())
    }
    if (isPast(nextBirthDay)) {
      if (isLeapBaby && !isLeapYear(new Date(now.getFullYear() + 1))) {
        nextBirthDay = new Date(now.getFullYear() + 1, 2, 1)
      } else {
        nextBirthDay = new Date(student.birthdate).setFullYear(now.getFullYear() + 1)
      }
    }
    return differenceInCalendarDays(nextBirthDay, now)
  }
}
