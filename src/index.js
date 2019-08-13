const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const { resolvers } = require('./resolvers')
const { permissions } = require('./permissions')
const serveStatic = require('serve-static')

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  middlewares: [permissions],
  context: request => {
    return {
      ...request,
      prisma
    }
  }
})

const options = {
  endpoint: '/api',
  subscriptions: '/api',
  playground: false
}

server.use('/parents', serveStatic('parents/public'))
server.use('/admin', serveStatic('admin/public'))
server.get('/', (_, response) => response.redirect('/parents'))

server.start(options, () => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`Server is running on ${process.env.PRODUCTION_ENDPOINT}`)
  } else {
    console.log('Server is running on http://localhost:4000')
  }
})
