import React, { useState } from 'react';
import { GoodsList } from './components';
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
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="App">
      <h1 className="App__title">List of goods</h1>
      {isVisible && <GoodsList listOfgoods={goodsFromServer} />}

      {!isVisible && (
        <button
          type="button"
          onClick={() => setIsVisible(true)}
          className="App__button"
        >
          Start
        </button>
      )}
    </div>
  );
};

export default App;
