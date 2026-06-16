const http = require('http');

const PORT = 5678;

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight CORS request
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Decode URI component to match "/webhook/VLH E-sport"
  const decodedUrl = decodeURIComponent(req.url);

  if (req.method === 'POST' && (decodedUrl === '/webhook/VLH E-sport' || decodedUrl === '/webhook/VLH%20E-sport' || decodedUrl === '/webhook-test/tournament-register')) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('\n[Mock Webhook] Received registration:');
        console.log(`Team Name: ${data.teamName}`);
        console.log(`UID:       ${data.uid}`);
        console.log(`IGN:       ${data.ign}`);
        console.log(`WhatsApp:  ${data.whatsapp}`);
        console.log(`Time:      ${data.submittedAt}\n`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success', message: 'Registration received' }));
      } catch (err) {
        console.error('[Mock Webhook] Error parsing JSON:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'error', message: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`[Mock Webhook Server] Listening on http://localhost:${PORT}`);
});
