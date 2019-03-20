const pinyin = require('pinyin')

const addMissingPinyin = chineseName => {
  let pinyinName = pinyin(chineseName).join('')
  pinyinName = pinyinName.charAt(0).toUpperCase() + pinyinName.slice(1)
  return pinyinName
}

exports.student = {
  createStudent (root, args, context) {
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
  updateStudent (root, args, context) {
    if (!args.input.pinyinName && args.input.chineseName) {
      args.input.pinyinName = addMissingPinyin(args.input.chineseName)
    }
    return context.prisma.updateStudent({
      data: { ...args.input },
      where: { id: args.id }
    })
  },
  deleteStudent (root, args, context) {
    return context.prisma.deleteStudent({ id: args.id })
  },
  addStudentToGroup (root, { studentId, groupId }, context) {
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
  removeStudentFromGroup (root, { studentId, groupId }, context) {
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
  }
}
