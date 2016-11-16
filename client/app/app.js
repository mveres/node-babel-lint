import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <form>
        <div>{'Hello from React!'}</div>
        <input type="text" />
        <input type="submit" />
      </form>
    );
  }
}

// Render to ID content in the DOM
ReactDOM.render(<App />, document.getElementById('app'));
