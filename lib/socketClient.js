import 'babel-core/register';
import 'babel-polyfill';

import { connect } from 'net';
import { ledCommands } from './ledConfig';

const connectAsync = options => new Promise(resolve => {
  const client = connect(options, () => resolve(client));
});

const runClient = async (host = '127.0.0.1', port = '1109') => {

  const client = await connectAsync({ host, port });

  console.log('connected');

  client.write(new Buffer(ledCommands.LED_1_ON));

  client.on('data', data => console.log(data.toString()));
};

runClient();
