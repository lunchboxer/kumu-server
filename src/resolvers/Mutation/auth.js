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
  async createUser (root, arguments_, context) {
    // The first user is made admin by default
    const password = await bcrypt.hash(arguments_.password, 10)
    const usersAlready = await context.prisma.$exists.user()
    if (!usersAlready) {
      arguments_.role = 'Admin'
    }
    return context.prisma.createUser({ ...arguments_, password })
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
    const user = await context.prisma.user({ username })
    if (!user) {
      throw new Error(`No user found for username: ${username}`)
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  }
}
