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

  const logo = 'http://i4.bvimg.com/635848/6b04ad113d1d828a.png'
  const headline = 'Main'

  // simulation data
  return { logo, headline }
}
