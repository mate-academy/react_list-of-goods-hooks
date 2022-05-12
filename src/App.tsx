import React, { useState } from 'react';
import GoodsList from './components/GoodsList/GoodsList';
import './App.scss';

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
  const [goods] = useState(goodsFromServer);
  const [start, setStart] = useState(false);

  return start ? (
    <div className="app">
      <h1 className="app__title">Goods:</h1>
      <GoodsList goods={goods} />
    </div>
  )
    : (
      <button
        className="start"
        type="button"
        onClick={() => setStart(true)}
      >
        Start
      </button>
    );
};

export default App;
