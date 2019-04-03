exports.Subscription = {
  semesters: {
    subscribe: async (_, args, { prisma }) => {
      prisma.$subscribe
        .semester({
          where: {
            mutation_in: ['CREATED', 'UPDATED']
          }
        })
        .node()
    },
    resolve: payload => {
      return payload
    }
  }
}
