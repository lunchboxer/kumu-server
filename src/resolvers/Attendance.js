exports.Attendance = {
  student (root, args, context) {
    return context.prisma.attendance({ id: root.id }).student()
  },
  classSession (root, args, context) {
    return context.prisma.attendance({ id: root.id }).classSession()
  }
}
