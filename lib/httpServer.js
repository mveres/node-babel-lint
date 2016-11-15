import http from 'http';

export const runServer = (port = 1109) => {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Jon\n');
  });

  server.listen(port, '127.0.0.1');

  console.log('Server running at http://127.0.0.1:1109/');
};
