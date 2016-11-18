import { connect as netConnect } from 'net';
import { ledCommands } from './ledConfig';

export const connectAsync = options => new Promise(resolve => {
  const client = netConnect(options, () => resolve(client));
});

let send = () => console.log('sendMessage stub');

export const connect = async (host = '127.0.0.1', port = '1109') => {

  const client = await connectAsync({ host, port });

  console.log('connected');

  send = () => client.write(new Buffer(ledCommands.LED_1_ON));

  client.on('data', data => console.log(data.toString()));
};

export const sendMessage = () => send();
