exports.semester = {
  createSemester(root, args, context) {
    return context.prisma.createSemester(args.input);
  },
  updateSemester(root, args, context) {
    return context.prisma.updateSemester({
      data: args.input,
      where: { id: args.id }
    });
  },
  deleteSemester(root, args, context) {
    return context.prisma.deleteSemester({ id: args.id });
  }
};
