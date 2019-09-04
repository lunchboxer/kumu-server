const { prisma } = require('./generated/prisma-client')
const fs = require('fs')
const fetch = require('node-fetch')
const { STUDENT, SESSION } = require('./export-queries')

const fsPromises = fs.promises

const limitedStudentFragment = /* GraphQL */`
  fragment LimitedStudentFragment on Student {
    id
    englishName
    chineseName
  }`

const request = async (query, variables) => {
  const body = typeof query === 'function'
    ? query(variables)
    : JSON.stringify({ query, variables })
  const response = await fetch(process.env.API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  const result = response && await response.json()
  if (response && response.ok && !result.errors && result.data) {
    return result.data
  } else {
    throw result.errors
  }
}
const writeSession = async sessionId => {
  const response = await request(SESSION, { id: sessionId })
  await fsPromises.writeFile(
    `./parents/public/data/session-${sessionId}.json`,
    JSON.stringify(response.classSession),
    'utf8')
}
const writeSessions = async semesterId => {
  const sessions = await prisma.classSessions({ where: { group: { semester: { id: semesterId } } } })
  await sessions.forEach(async session => writeSession(session.id))
}

const writeStudent = async (studentId, semesterId) => {
  const response = await request(STUDENT, { id: studentId, semesterId })
    .catch(error => console.error(error))
  const student = { ...response.student, attendances: response.attendances }
  await fsPromises.writeFile(
    `./parents/public/data/student-${studentId}.json`,
    JSON.stringify(student),
    'utf8')
}

const writeStudentList = (list) => fsPromises.writeFile(
  './parents/public/data/students.json',
  JSON.stringify(list),
  'utf8')

const exportData = async () => {
  const now = new Date()
  const semester = await prisma.semesters({ where: { startDate_lt: now, endDate_gt: now } })
  if (!semester || semester.length === 0) return
  const semesterId = semester[0].id
  const where = { groups_some: { semester: { id: semesterId } } }

  const miniStudentList = await prisma.students({ where }).$fragment(limitedStudentFragment)

  await Promise.all([
    writeStudentList(miniStudentList),
    miniStudentList.forEach(async student => writeStudent(student.id, semesterId)),
    writeSessions(semesterId)
  ])
  console.log('Exported data successfully')
  return true
}

module.exports = { exportData, writeSession, writeStudent, writeStudentList }

exportData()
