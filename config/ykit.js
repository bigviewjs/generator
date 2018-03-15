'use stirct'

const path = require('path')

// default output.path
const staticPath = 'public'

module.exports = {
  port: 8000,
  cwd: process.cwd(),
  context: path.join(process.cwd(), staticPath),
  hooks: {},
  commands: []
}
