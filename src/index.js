const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const { resolvers } = require('./resolvers')
const { permissions } = require('./permissions')
const serveStatic = require('serve-static')
const { exportData } = require('./export-data')

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
  subscriptions: '/subscriptions',
  playground: '/playground'
}

server.use('/parents', serveStatic('parents/public'))
server.use('/admin', serveStatic('admin/public'))
server.get('/', (_, response) => response.redirect('/parents'))
server.get('/export-data', async (_, response) => response.send(await exportData()))

server.start(options, () => {
  console.log('Server is running on http://localhost:4000')
})
