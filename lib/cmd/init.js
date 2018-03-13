'use strict'

const inquirer = require('inquirer')
const path = require('path')

const config = require('../../config')
const Generator = require('../generator')

async function init (args) {
  // 获取命令行参数 project name
  const _path = path.parse(process.cwd())
  const projectName = args.projecetName ? args.projecetName : _path.name
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
  options.projectDir = args.projecetName ? path.join(process.cwd(), projectName) : process.cwd()
  console.log(options.projectDir)
  const gene = new Generator(options)
  await gene.build()
}

module.exports = init
