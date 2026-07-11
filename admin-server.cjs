const http = require('http')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const PORT = 3001
const PROJECT_DIR = __dirname
const CONTENT_FILE = path.join(PROJECT_DIR, 'src', 'data', 'content.json')

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  // 获取内容
  if (req.url === '/api/content' && req.method === 'GET') {
    const content = fs.readFileSync(CONTENT_FILE, 'utf-8')
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(content)
    return
  }

  // 保存内容
  if (req.url === '/api/content' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => {
      try {
        const data = JSON.parse(body)
        fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), 'utf-8')
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({ success: true, message: '保存成功' }))
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({ success: false, message: e.message }))
      }
    })
    return
  }

  // 推送到GitHub
  if (req.url === '/api/push' && req.method === 'POST') {
    try {
      const { execSync } = require('child_process')
      execSync('git add -A', { cwd: PROJECT_DIR })
      const now = new Date()
      const msg = 'backend-update-' + now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0') + '-' + String(now.getHours()).padStart(2,'0') + String(now.getMinutes()).padStart(2,'0')
      execSync('git commit -m "' + msg + '"', { cwd: PROJECT_DIR })
      execSync('git push', { cwd: PROJECT_DIR, timeout: 60000 })
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify({ success: true, message: '推送成功！' }))
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify({ success: false, message: e.message.substring(0, 200) }))
    }
    return
  }

  // 管理页面
  if (req.url === '/' || req.url === '/admin') {
    const html = fs.readFileSync(path.join(PROJECT_DIR, 'admin.html'), 'utf-8')
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(html)
    return
  }

  res.writeHead(404)
  res.end('Not Found')
})

server.listen(PORT, () => {
  console.log(`\n========================================`)
  console.log(`  XiaoXin 后台管理系统`)
  console.log(`  打开浏览器访问: http://localhost:${PORT}`)
  console.log(`========================================\n`)
})
