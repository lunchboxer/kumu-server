exports.Group = {
  students (root, _, context) {
    return context.prisma
      .group({
        id: root.id
      })
      .students()
  },
  semester (root, _, context) {
    return context.prisma.group({ id: root.id }).semester()
  }
}
