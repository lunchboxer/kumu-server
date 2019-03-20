const { auth } = require('./auth')
const { student } = require('./student')
const { group } = require('./group')
const { semester } = require('./semester')
const { point } = require('./point')
const { classSession } = require('./classSession')

exports.Mutation = {
  ...auth,
  ...student,
  ...group,
  ...semester,
  ...point,
  ...classSession
}
