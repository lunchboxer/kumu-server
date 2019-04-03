const pinyin = require('pinyin')

const addMissingPinyin = chineseName => {
  let pinyinName = pinyin(chineseName).join('')
  pinyinName = pinyinName.charAt(0).toUpperCase() + pinyinName.slice(1)
  return pinyinName
}

const limitBirthdates = birthdate => {
  if (!birthdate) return false
  const bdate = new Date(birthdate)
  const now = new Date()
  if (bdate > now) {
    throw new Error('Birth date must be a past date.')
  }
  if (birthdate < '1910-00-00') {
    throw new Error('No students born before 1910 allowed.')
  }
}

exports.student = {
  createStudent (_, args, context) {
    limitBirthdates(args.input.birthdate)
    if (!args.input.pinyinName) {
      args.input.pinyinName = addMissingPinyin(args.input.chineseName)
    }
    return context.prisma.createStudent({
      ...args.input,
      groups: {
        connect: {
          id: args.groupId
        }
      }
    })
  },
  updateStudent (_, args, context) {
    limitBirthdates(args.input.birthdate)
    if (!args.input.pinyinName && args.input.chineseName) {
      args.input.pinyinName = addMissingPinyin(args.input.chineseName)
    }
    return context.prisma.updateStudent({
      data: { ...args.input },
      where: { id: args.id }
    })
  },
  deleteStudent (_, args, context) {
    return context.prisma.deleteStudent({ id: args.id })
  },
  addStudentToGroup (_, { studentId, groupId }, context) {
    return context.prisma.updateStudent({
      where: { id: studentId },
      data: {
        groups: {
          connect: {
            id: groupId
          }
        }
      }
    })
  },
  removeStudentFromGroup (_, { studentId, groupId }, context) {
    return context.prisma.updateStudent({
      where: { id: studentId },
      data: {
        groups: {
          disconnect: {
            id: groupId
          }
        }
      }
    })
  },
  moveStudentToDifferentGroup (_, args, context) {
    return context.prisma.updateStudent({
      where: { id: args.studentId },
      data: {
        groups: {
          disconnect: {
            id: args.oldGroupId
          },
          connect: {
            id: args.newGroupId
          }
        }
      }
    })
  }
}
