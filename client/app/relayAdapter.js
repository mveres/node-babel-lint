import { ipcRenderer } from 'electron';

export const connect = options => ipcRenderer.send('connect', options);
export const switchRelay = args => ipcRenderer.send('switchRelay', args);

const connectedCallbacks = [];

export const onConnected = callback => connectedCallbacks.push(callback);
ipcRenderer.on('connect-reply', (event, { connected }) => connectedCallbacks.forEach(f => f(connected)));
