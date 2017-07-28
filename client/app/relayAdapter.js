import { ipcRenderer } from 'electron';

export const connect = options => ipcRenderer.send('connect', options);
export const switchRelay = args => ipcRenderer.send('switchRelay', args);

const connectedCallbacks = [];

export const onConnected = callback => connectedCallbacks.push(callback);
ipcRenderer.on('connect-reply', (event, data) => {
  console.log('connected:', data.connected);
  connectedCallbacks.forEach(f => f(data));
});
