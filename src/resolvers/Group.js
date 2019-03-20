exports.Group = {
  students (root, args, context) {
    return context.prisma
      .group({
        id: root.id
      })
      .students()
  },
  semester (root, args, context) {
    return context.prisma.group({ id: root.id }).semester()
  }
}
