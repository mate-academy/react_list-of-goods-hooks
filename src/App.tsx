import React, { useState } from 'react';
import './App.css';
import { ListOfGoods } from './Component.tsx/ListOfGoods';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="App has-text-centered">

      {!isStarted && (
        <button
          type="button"
          className="button is-success "
          onClick={() => {
            setIsStarted(true);
          }}
        >
          Start
        </button>
      )}

      {isStarted && (
        <ListOfGoods goods={goodsFromServer} />
      )}
    </div>
  );
};
