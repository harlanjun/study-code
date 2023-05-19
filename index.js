const http = require('http')
const fs = require('fs')
const path = require('path')
fs.readFile(path.join(__dirname, './reverse.js'), 'utf-8', (err, data) => {
  if(err) {
    console.log('err', err)
    return
  }
  console.log(typeof data)
})
// http.createServer((req, res) => {
//   console.log(req)
//   res.end('hello world')
// }).listen(5000)

// const EventEmitter = require('events').EventEmitter
// const event = new EventEmitter()
// event.on('some_event', (e) => {
//   console.log(e)
// })
// setTimeout(function() { event.emit('some_event', 'aa') }, 1000);
// console.log(global.process)
console.log('---------------')
// console.log(process.argv)
// process.stdin.resume()
// process.stdin.on('data', (data) => {
//   process.stdout.write('read', data) 
// })
const util = require('util')
console.log(util.inspect(process, true, true, true))