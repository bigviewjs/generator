async function _timeout (timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

module.exports = async function fetch () {
  // simulation fetch time
  await _timeout(2000)

  const logo = 'http://i2.bvimg.com/635848/4ee74502d03da0ca.png'
  const headline = 'Main'

  // simulation data
  return { logo, headline }
}
