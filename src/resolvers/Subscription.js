exports.Subscription = {
  points: {
    subscribe: async (_, { classSessionId }, { prisma }) => {
      return prisma.$subscribe.point({
        node: { classSession: { id: classSessionId } }
      })
    },
    resolve: payload => {
      return payload
    }
  },
  attendances: {
    subscribe: async (_, { classSessionId }, { prisma }) => {
      return prisma.$subscribe
        .attendance({
          mutation_in: ['CREATED', 'UPDATED'],
          node: { classSession: { id: classSessionId } }
        })
        .node()
    },
    resolve: payload => {
      return payload
    }
  },
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
