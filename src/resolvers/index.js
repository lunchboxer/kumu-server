const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Subscription } = require('./Subscription')
const { Student } = require('./Student')
const { Group } = require('./Group')
const { Semester } = require('./Semester')
const { ClassSession } = require('./ClassSession')
const { Point } = require('./Point')
const { Attendance } = require('./Attendance')
const { Lesson } = require('./Lesson')
const { Tag } = require('./Tag')

exports.resolvers = {
  Query,
  Mutation,
  Subscription,
  Student,
  Group,
  Semester,
  ClassSession,
  Point,
  Attendance,
  Lesson,
  Tag
}
