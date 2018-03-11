'use strict'

/**
 * Egg 框架的 context 扩展，可以自定义使用模板，实现其中的 render 方法即可
 */
const nunjucks = require('nunjucks')

module.exports = {
  /**
   * 供 bigView 中使用的 ctx.render 方法，用于编译模板
   * @param  {String} tpl 模板路径
   * @param  {String} data 编译数据
   * @param  {Function} 回调函数
   * @return {Function || String} 编译完成的 html 字符串
   */
  render (tpl, data, cb) {
    const env = nunjucks.configure()

    if (/\.nj$/.test(tpl) || /\.html$/.test(tpl)) {
      env.render(tpl, data, (err, html) => {
        cb(err, html)
      })
    } else {
      env.renderString(tpl, data, (err, html) => {
        cb(err, html)
      })
    }
  }
}
