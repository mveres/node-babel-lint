import { createServer } from 'net';

const runServer = (port = 1109) => {

  let clientCounter = 0;
  const server = createServer(connection => {

    const name = `client${++clientCounter}`; // eslint-disable-line no-plusplus
    console.log(`${name} connected...`);

    const time = new Date(Date.now()).toLocaleString();
    connection.write(`Hello from server, ${name}! Server time is ${time}\n`);


    connection.on('data', data => {
      console.log(`data received from ${name}`, data);
      connection.write('Echo:');
      connection.write(data);
    });

    connection.on('close', () => console.log(`${name} disconnected`));

  });

  server.listen(port);
  console.log('listening for connections...');

};

runServer();
