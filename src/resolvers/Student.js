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
  }
}
