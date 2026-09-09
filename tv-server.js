import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function handleRequest(req, res) {
  const clientIp = req.socket.remoteAddress;
  let reqUrl = req.url.split('?')[0];

  if (reqUrl === '/api/log') {
    const urlObj = new URL(req.url, 'http://localhost');
    const msg = urlObj.searchParams.get('msg') || '';
    console.log(`📡 [TV LOG from ${clientIp}]: ${msg}`);
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });
    res.end('ok');
    return;
  }
  if (reqUrl === '/' || reqUrl === '') reqUrl = '/index.html';

  let filePath = path.join(DIST_DIR, reqUrl);

  // Fallback to index.html for SPA routing
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`[${new Date().toLocaleTimeString()}] 404: ${reqUrl} from ${clientIp}`);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    console.log(`[${new Date().toLocaleTimeString()}] 200: ${reqUrl} (${contentType}) -> ${clientIp}`);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
}

// Start on port 80 (default HTTP, no port needed in URL!)
const server80 = http.createServer(handleRequest);
server80.listen(80, '0.0.0.0', () => {
  console.log(`🚀 TV Server running on PORT 80 (http://192.168.50.102)`);
}).on('error', (err) => {
  console.warn(`Could not bind port 80: ${err.message}`);
});

// Also listen on port 5173 for backward compatibility
const server5173 = http.createServer(handleRequest);
server5173.listen(5173, '0.0.0.0', () => {
  console.log(`🚀 TV Server running on PORT 5173 (http://192.168.50.102:5173)`);
});
