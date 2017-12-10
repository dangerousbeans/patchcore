const manifest = {
  "auth": "async",
  "address": "sync",
  "manifest": "sync",
  "get": "async",
  "createFeedStream": "source",
  "createLogStream": "source",
  "messagesByType": "source",
  "createHistoryStream": "source",
  "createUserStream": "source",
  "links": "source",
  "relatedMessages": "async",
  "add": "async",
  "publish": "async",
  "getAddress": "sync",
  "getLatest": "async",
  "latest": "source",
  "latestSequence": "async",
  "whoami": "sync",
  "progress": "sync",
  "status": "sync",
  "getVectorClock": "async",
  "seq": "async",
  "usage": "sync",
  "clock": "async",
  "plugins": {
    "install": "source",
    "uninstall": "source",
    "enable": "async",
    "disable": "async"
  },
  "gossip": {
    "peers": "sync",
    "add": "sync",
    "remove": "sync",
    "ping": "duplex",
    "connect": "async",
    "changes": "source",
    "reconnect": "sync",
    "enable": "sync",
    "disable": "sync"
  },
  "replicate": {
    "changes": "source",
    "upto": "source",
    "request": "sync"
  },
  "friends": {
    "get": "async",
    "createFriendStream": "source",
    "stream": "source",
    "hops": "async"
  },
  "blobs": {
    "get": "source",
    "getSlice": "source",
    "add": "sink",
    "rm": "async",
    "ls": "source",
    "has": "async",
    "size": "async",
    "meta": "async",
    "want": "async",
    "push": "async",
    "changes": "source",
    "createWants": "source"
  },
  "invite": {
    "create": "async",
    "accept": "async",
    "use": "async"
  },
  "private": {
    "publish": "async",
    "unbox": "sync"
  },
  "query": {
    "read": "source"
  },
  "links2": {
    "read": "source"
  },
  "ws": {
    "getAddress": "sync"
  }
}

const keys = {
        id: "@TXKFQehlyoSn8UJAIVP/k2BjFINC591MlBC2e2d24mA=.ed25519",
        public: "TXKFQehlyoSn8UJAIVP/k2BjFINC591MlBC2e2d24mA=.ed25519",
        private: "lolno"
      }
const ssbClient = require('../sbot.js')
const h = require('mutant/h')

const combine = require('depject')
const apply = require('depject/apply')
const Path = require('path')

const modules = require('../')
var api = entry(combine(modules))

var client = new Promise((resolve, reject) => {
  api(keys, {                                                                       
    manifest: manifest,
    remote: 'ws://localhost:8989~shs:TXKFQehlyoSn8UJAIVP/k2BjFINC591MlBC2e2d24mA='
  }, (err, sbot) => {      
    if (err) {                               
      reject(err)                      
    } else {                                                                              
      resolve(sbot)  
    }                                       
  })                               
});




client.then((sbot) => {
  console.log("SBOT", sbot)
  
  var app = h('div.App', [
    api.feed.html.render(api.feed.pull.public)
  ])

  document.head.appendChild(h('title', 'PATCHCORE :: Example'))
  document.body.appendChild(app)


});

function entry (sockets) {
    return {
      feed: {
        html: {
          render: apply.first(sockets.feed.html.render)
        },
        pull: {
          public: apply.first(sockets.feed.pull.public)
        }
      }
    }
  }