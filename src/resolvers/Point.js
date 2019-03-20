exports.Point = {
  student (root, args, context, info) {
    return context.prisma.point({ id: root.id }).student()
  },
  classSession (root, args, context) {
    return context.prisma.point({ id: root.id }).classSession()
  }
}
