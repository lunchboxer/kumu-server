exports.ClassSession = {
  group (root, args, context) {
    return context.prisma.classSession({ id: root.id }).group()
  },
  points (root, args, context) {
    return context.prisma.classSession({ id: root.id }).points()
  }
}
