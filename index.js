window.setImmediate = require('timers').setImmediate;
window.net = require('net')
// require('smtpconnection');

const bulk = require('bulk-require')

module.exports = {
  patchcore: bulk(__dirname, [
    './+(config|emoji|invite|keys|sbot).js',
    './+(about|backlinks|blob|channel|contact|feed|lib|message|router)/**/*.js'
  ])
}
