'use strict'

module.exports = {
  questions: {
    projectName: {
      needful: true,
      default: 'paas',
      desc: 'project name'
    },
    description: {
      default: 'description',
      desc: 'project description'
    },
    author: {
      desc: 'project author'
    },
    keys: {
      desc: 'cookie security keys',
      default: Date.now() + '_' + random(100, 10000)
    }
  }
}

function random (start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
