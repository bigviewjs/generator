'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, pages } = app
  router.get('/', pages.playpage)
}
