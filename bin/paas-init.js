#!/usr/bin/env node

'use strict'

const inquirer = require('inquirer')

const config = require('../config')
const Generator = require('../lib/generator')

try {
  (async function init () {
    // 获取命令行参数 project name
    const args = process.argv.slice(2)

    const projectName = args[0]
    const questions = config.questions

    const arr = []
    for (let key in questions) {
      let q = questions[key]
      let question = {
        name: key,
        type: 'input',
        message: q.desc,
        default: q.default
      }
      if (key === 'projectName') {
        question.default = projectName
      }
      arr.push(question)
    }

    // ask project info
    const options = await inquirer.prompt(arr)
    const gene = new Generator(options)
    await gene.build()
  })()
} catch (err) {
  console.error(err.stack)
}
