import React, { useState } from 'react';
import './App.scss';
import { List } from './components/List';

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
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="app">
      <h1 className="app__header">Goods</h1>

      {isVisible && <List goodsList={goodsFromServer} />}

      {
        !isVisible && (
          <button
            type="button"
            onClick={() => setIsVisible(true)}
            className="show-button"
          >
            Start
          </button>
        )
      }
    </div>
  );
};

export default App;
