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

  const logo = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528472457571&di=52a2614c98827eb55d8c026594193fee&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fvideo%2F66%2F664185a0fa37a4f855357e23d96bf52b.jpg'
  const headline = 'Main'

  // simulation data
  return { logo, headline }
}
