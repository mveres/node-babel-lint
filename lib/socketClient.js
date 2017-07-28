import { connect as netConnect } from 'net';

const defaultOptions = { host: '192.168.1.5', port: '1109' };

let send = () => console.log('sendMessage stub');
let onDisconnected = () => console.log('onDisconnected stub');
let onError = () => console.log('onError stub');

const connectAsync = options => new Promise(resolve => {
  const client = netConnect(options, () => resolve(client));
  client.on('error', e => {
    console.log('connect error', e);
    onError(e);
  });
});

export const connect = async (options = defaultOptions) => {

  try {
    const client = await connectAsync(options);

    client.on('connect', () => console.log('connected'));

    send = data => client.write(Buffer.from(data));

    client.on('data', data => console.log(data.toString()));
    client.on('end', reason => {
      console.log('client disconnected!', reason);
      onDisconnected();
    });
  } catch (e) {
    console.log(e);
  }
};

export const sendMessage = data => send(data);
export const setDisconnectedListener = func => { onDisconnected = func; };
export const setErrorListener = func => { onError = func; };
