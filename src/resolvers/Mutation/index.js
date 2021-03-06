const { auth } = require('./auth')
const { student } = require('./student')
const { group } = require('./group')
const { semester } = require('./semester')
const { point } = require('./point')
const { classSession } = require('./classSession')
const { attendance } = require('./attendance')
const { lesson } = require('./lesson')
const { tag } = require('./tag')
const { material } = require('./material')
const { word } = require('./word')

exports.Mutation = {
  ...auth,
  ...student,
  ...group,
  ...semester,
  ...point,
  ...classSession,
  ...attendance,
  ...lesson,
  ...tag,
  ...material,
  ...word
}
