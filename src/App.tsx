import React, { useState } from 'react';
import './App.css';
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
  const [buttonVisibility, setButtonVisibility] = useState(false);

  return (
    <div>
      {buttonVisibility
        ? (
          <List goods={goodsFromServer} />
        )
        : (
          <button
            className="button"
            type="button"
            onClick={() => {
              setButtonVisibility(current => !current);
            }}
          >
            Start
          </button>
        )}
    </div>
  );
};

export default App;
