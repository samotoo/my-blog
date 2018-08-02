exports.onClientEntry = () => {
  // Register leancloud AV object to global
  window.AV = require('leancloud-storage')
}
