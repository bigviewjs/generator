async function _timeout (timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

module.exports = async function fetch () {
  await _timeout(2000)
  const headline = 'Other'
  return { headline }
}
