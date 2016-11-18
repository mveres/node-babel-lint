import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';

const f1 = () => new Promise(resolve => setTimeout(() => resolve(43), 1000));
const send = async () => {
  ipcRenderer.send('asynchronous-message', 'ping');

  const r = await f1();
  console.log(r);
};

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg); // prints "pong"
});


class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={ send } />
      </div>
    );
  }
}

// Render to ID content in the DOM
ReactDOM.render(<App />, document.getElementById('app'));
