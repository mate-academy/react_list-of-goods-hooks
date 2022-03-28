import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList';

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
  const [isStarted, setStart] = useState(false);

  const getStarted = () => {
    setStart(true);
  };

  return (
    <div className="app">
      <h1 className="app__title">Goods</h1>
      {isStarted
        ? (
          <GoodsList goods={goodsFromServer} />
        )
        : (
          <button
            type="button"
            className="button app__button"
            onClick={getStarted}
          >
            Start
          </button>
        )}
    </div>
  );
};

export default App;
