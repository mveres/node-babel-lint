import { createServer } from 'net';

export const runServer = (port = 1109) => {

  const server = createServer(connection => {

    console.log('someone connected...');

    const time = new Date(Date.now()).toLocaleString();
    connection.write(`Hi there! It's ${time}\n`);

    connection.on('close', () => console.log('someone disconnected'));

  });

  server.listen(port);
  console.log('listening for connections...');
};
