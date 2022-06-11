import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList/GoodsList';

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
  const [showButton, setShowButton] = useState<boolean>(true);
  const [showGoods, setShowGoods] = useState<boolean>(false);

  return (
    <div className="App">
      {showButton && (
        <button
          type="button"
          className="button button-blue App__button"
          onClick={() => {
            setShowButton(false);
            setShowGoods(true);
          }}
        >
          Start
        </button>
      )}

      {showGoods && <GoodsList goods={goodsFromServer} />}
    </div>
  );
};

export default App;
