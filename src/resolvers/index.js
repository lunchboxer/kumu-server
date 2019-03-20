const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Student } = require('./Student')
const { Group } = require('./Group')
const { Semester } = require('./Semester')
const { ClassSession } = require('./ClassSession')
const { Point } = require('./Point')

exports.resolvers = {
  Query,
  Mutation,
  Student,
  Group,
  Semester,
  ClassSession,
  Point
}
