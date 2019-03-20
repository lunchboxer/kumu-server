exports.group = {
  createGroup (root, args, context) {
    return context.prisma.createGroup({
      name: args.name,
      semester: {
        connect: {
          id: args.semesterId
        }
      }
    })
  },
  updateGroup (root, args, context) {
    let data = {}
    if (args.semesterId) {
      data = {
        name: args.name,
        semester: { connect: { id: args.semesterId } }
      }
    } else {
      data = { name: args.name }
    }
    return context.prisma.updateGroup({
      data,
      where: { id: args.id }
    })
  },
  deleteGroup (root, args, context) {
    return context.prisma.deleteGroup({ id: args.id })
  }
}
