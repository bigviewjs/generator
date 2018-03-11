'use strict'

const Controller = require('egg').Controller
const BigView = require('bigkoa')

const layoutPagelet = require('../bpmodule/layout')
const mainPagelet = require('../bpmodule/main')
const otherPagelet = require('../bpmodule/other')

class HomeController extends Controller {
  async index () {
    this.ctx.status = 200
    const bigView = new BigView(this.ctx)

    // set layout
    bigView.layout = layoutPagelet
    // set main
    bigView.main = mainPagelet
    // you can custom bigView dataStore
    bigView.dataStore = {}
    bigView.add(otherPagelet)

    await bigView.start()
  }
}

module.exports = HomeController
