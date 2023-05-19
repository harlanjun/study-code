const http = require('http')
const fs = require('fs')
const path = require('path')
const game = require('./game')

const default_html = path.resolve(__dirname, '../web/index.html')
const inputCout = 0
const inputAction = null
http.createServer((req, res) => {  
    const parsedUrl = new URL(req.url, "http://exmple.com")
    if(parsedUrl.pathname === '/favicon.ico') {
        res.writeHead(200)
        res.end()
        return
    }
    if(parsedUrl.pathname === '/game') {
        res.writeHead(200, {'Content-type': 'application/json;charset=utf-8'})
        const query = parsedUrl.searchParams
        const queryAction = query.get('action')
        let result = 0, code = 0
        try {
            if(inputAction && inputAction === queryAction) {
                inputCout++
            }
            inputAction = queryAction
            result = game(queryAction)
        } catch (e) {
            code = 0
            result = e.message
            return
        }
        res.end(JSON.stringify({ data: result, code: 0 }))
        return
    }
    fs.createReadStream(default_html).pipe(res)
    // res.end()
}).listen(3000)