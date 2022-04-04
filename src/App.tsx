import React, { useState } from 'react';
import './App.css';
import GoodsList from './components/GoodsList';

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

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  // eslint-disable-next-line no-console
  console.log(goodsFromServer);

  return (
    <div className="App">
      <h1>Goods</h1>
      {!visible
        && (
          <button
            type="submit"
            onClick={() => setVisible(true)}
          >
            Show
          </button>
        )}
      {visible
        && <GoodsList goods={goodsFromServer} />}
    </div>
  );
};

export default App;
