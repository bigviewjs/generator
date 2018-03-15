'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const glob = require('glob')

const config = require(path.join(__dirname, '../config/index.js'))

class Generator {
  constructor (options) {
    const questions = config.questions

    // check options
    for (let key in questions) {
      let q = questions[key]
      if (q.needful) {
        assert(options[key], `${key} is needful`)
      }
    }

    this.options = options
    this.projectName = options.projectName
    this.projectDir = options.projectDir || path.join(process.cwd(), this.projectName)
  }

  async build () {
    const projectDir = this.projectDir

    if (!this._checkDir(projectDir)) {
      console.log(`${projectDir} is exists and not empty `)
      return
    }

    // create dir
    mkdirp.sync(projectDir)
    // get template dir
    const templateDir = path.join(__dirname, '../template')
    // write file with template
    await this._writeFile(projectDir, templateDir)
  }

  async _writeFile (targetDir, templateDir) {
    const files = glob.sync('**/*', { cwd: templateDir, dot: true, nodir: true })

    for (let file of files) {
      let from = path.join(templateDir, file)
      let to = path.join(targetDir, file)
      let dir = path.dirname(to)
      const content = fs.readFileSync(from)
      if (!fs.existsSync(dir)) {
        mkdirp.sync(dir)
      }
      fs.writeFileSync(to, this._replaceTemplate(content, this.options))
      console.log(`write ${to}`)
    }
  }

  _checkDir (projectDir) {
    let is = true
    // check project dir
    if (fs.existsSync(projectDir)) {
      is = false
    }
    return is
  }

  _replaceTemplate (content, scope) {
    return content.toString().replace(/(\\)?<% *(\w+) *%>/g, (block, skip, key) => {
      if (skip) {
        return block.substring(skip.length)
      }
      return scope.hasOwnProperty(key) ? scope[key] : block
    })
  }
}

module.exports = Generator
