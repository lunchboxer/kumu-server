const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.auth = {
  // async signup (root, args, context) {
  //   const password = await bcrypt.hash(args.password, 10)
  //   const user = await context.prisma.createUser({ ...args, password })

  //   return {
  //     token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
  //     user
  //   }
  // },
  async createUser (root, args, context) {
    // The first user is made admin by default
    const password = await bcrypt.hash(args.password, 10)
    const usersAlready = await context.prisma.$exists.user()
    if (!usersAlready) {
      args.role = 'Admin'
    }
    return context.prisma.createUser({ ...args, password })
  },
  async updateUser (root, { input, id }, context) {
    return context.prisma.updateUser({ data: { ...input }, where: { id } })
  },
  async deleteUser (root, { id }, context) {
    return context.prisma.deleteUser({ id })
  },
  async changePassword (root, { newPassword, id }, context) {
    const password = await bcrypt.hash(newPassword, 10)
    return context.prisma.updateUser({ data: { password }, where: { id } })
  },
  async login (_, { username, password }, context) {
    const hrstart = process.hrtime()
    const user = await context.prisma.user({ username })
    if (!user) {
      throw new Error(`No user found for username: ${username}`)
    }
    const hrend = process.hrtime(hrstart)
    console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  },
  async createStudentPassword (_, args, { prisma }) {
    const password = await bcrypt.hash(args.password, 10)
    const student = prisma.updateStudent({
      where: { id: args.studentId },
      data: { password, lastLogin: new Date() }
    })
    return {
      token: jwt.sign({ studentId: student.id }, process.env.APP_SECRET),
      student
    }
  },
  async studentLogin (_, { studentId, password }, { prisma }) {
    const student = await prisma.student({ id: studentId })
    if (!student) {
      throw new Error(`No user found for student id: studentId`)
    }
    const passwordValid = await bcrypt.compare(password, student.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    const loggedInStudent = await prisma.updateStudent({
      where: { id: studentId },
      data: { lastLogin: new Date() }
    })
    return {
      token: jwt.sign({ studentId: student.id }, process.env.APP_SECRET),
      student: loggedInStudent
    }
  }
}
