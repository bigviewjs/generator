#!/usr/bin/env node

const yargs = require('yargs')

const init = require('./lib/cmd/init')
const start = require('./lib/cmd/start')

const options = {
  ykitENV: {
    type: 'string',
    description: 'ykit env'
  },
  eggPort: {
    type: 'number',
    description: 'egg port'
  },
  baseDir: {
    type: 'string',
    description: 'target directory'
  },
  publicDir: {
    type: 'string',
    description: 'ykit public directory'
  },
  workers: {
    type: 'number',
    description: 'egg workers count'
  }
}

yargs
  .command('init [projecetName]', 'init paas project', (_yargs) => {
    _yargs.positional('projecetName', {
      describe: 'projecetName to init'
    })
  }, init)
  .command('start', 'start proxy', {}, start)
  .usage(`Usage: paas init [projecetName]\n`)
  .usage(`Usage: paas start --ykitENV=dev --eggPort=6001 --workers=1 --baseDir=your_directory --publicDir=your_public_directory\n`)
  .options(options)
  .alias('h', 'help')
  .version()
  .help()
  .argv
