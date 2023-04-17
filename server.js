const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.url === '/update-image' && req.method === 'POST') {
    exec('./update_image.sh', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: \${error}`);
        res.statusCode = 500;
        res.end('Error updating image');
        return;
      }
      console.log(`stdout: \${stdout}`);
      console.error(`stderr: \${stderr}`);
      res.statusCode = 200;
      res.end('Image updated successfully');
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
