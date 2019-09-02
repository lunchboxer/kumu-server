const { prisma } = require('./generated/prisma-client')
const fs = require('fs')
const fetch = require('node-fetch')
const { STUDENT, SESSION } = require('./export-queries')

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

exports.exportData = async () => {
  const exportResult = []
  const now = new Date()
  const semester = await prisma.semesters({ where: { startDate_lt: now, endDate_gt: now } })
  if (!semester || semester.length === 0) return
  const semesterId = semester[0].id
  const where = { groups_some: { semester: { id: semesterId } } }

  // export the list of students
  const miniStudentList = await prisma.students({ where }).$fragment(limitedStudentFragment)
  fs.writeFile('./parents/public/data/students.json', JSON.stringify(miniStudentList), 'utf8', error => {
    if (error) throw error
  })
  exportResult.push(`${miniStudentList.length} students exported to list`)

  // export data for each student
  await miniStudentList.forEach(async student => {
    const response = await request(STUDENT, { id: student.id, semesterId })
      .catch(error => console.error(error))
    student = { ...student, ...response.student, attendances: response.attendances }
    await fs.writeFile(`./parents/public/data/student-${student.id}.json`, JSON.stringify(student), 'utf8', error => {
      if (error) throw error
      exportResult.push(`${student.englishName}'s student data exported`)
    })
  })

  // export data for each classSession
  const sessions = await prisma.classSessions({ where: { group: { semester: { id: semesterId } } } })
  sessions.forEach(async session => {
    const response = await request(SESSION, { id: session.id })
    fs.writeFile(
      `./parents/public/data/session-${session.id}.json`,
      JSON.stringify(response.classSession),
      'utf8',
      error => {
        if (error) {
          throw error
        } else {
          exportResult.push(`classSession '${session.id}' exported`)
        }
      })
  })
  return exportResult
}
