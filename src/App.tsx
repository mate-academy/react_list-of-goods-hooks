import React from 'react';
import './App.css';

const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

class App extends React.Component {
  state = {};
  render() {
    return (
      <div className="App">
        <h1>Goods</h1>
        {goodsFromServer.length}
      </div>
    );
  }
}
export default App;
