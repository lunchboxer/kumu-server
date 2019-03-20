exports.Semester = {
  groups (root, args, context) {
    return context.prisma
      .semester({
        id: root.id
      })
      .groups()
  }
}
