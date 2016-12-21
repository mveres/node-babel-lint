import { connect as netConnect } from 'net';

const defaultOptions = { host: '192.168.1.5', port: '1109' };

const connectAsync = options => new Promise(resolve => {
  const client = netConnect(options, () => resolve(client));
});

let send = () => console.log('sendMessage stub');

export const connect = async (options = defaultOptions) => {

  const client = await connectAsync(options);

  console.log('connected');

  send = data => client.write(Buffer.from(data));

  client.on('data', data => console.log(data.toString()));
};

export const sendMessage = data => send(data);
