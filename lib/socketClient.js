import { connect as netConnect } from 'net';
import { ledCommands } from './ledConfig';

const defaultOptions = { host: '192.168.1.5', port: '1109' };

const connectAsync = options => new Promise(resolve => {
  const client = netConnect(options, () => resolve(client));
});

let send = () => console.log('sendMessage stub');

export const connect = async (options = defaultOptions) => {

  const client = await connectAsync(options);

  console.log('connected');

  send = () => client.write(new Buffer(ledCommands.LED_1_ON));

  client.on('data', data => console.log(data.toString()));
};

export const sendMessage = () => send();
