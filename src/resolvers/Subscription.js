exports.Subscription = {
  classSession: {
    subscribe: async (_, { id }, { prisma }) => {
      return prisma.$subscribe.classSession({ node: { id } }).node()
    },
    resolve: payload => {
      return payload
    }
  },
  classSessions: {
    subscribe: async (_, { where }, { prisma }) => {
      return prisma.$subscribe.classSession({ ...where })
    },
    resolve: payload => {
      return payload
    }
  },
  semesters: {
    subscribe: async (_, args, { prisma }) => {
      return prisma.$subscribe
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
