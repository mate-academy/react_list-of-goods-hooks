import React, { useState } from 'react';
import './App.css';
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
  const [listShown, setListShown] = useState(false);

  const handleStartBtn = () => (
    setListShown(prev => !prev)
  );

  return (
    <div
      className="
        container
        is-max-desktop
      "
    >
      <h1 className="title is-1 has-text-centered">Goods</h1>
      {listShown
        ? <GoodsList goods={goodsFromServer} />
        : (
          <button
            type="button"
            onClick={handleStartBtn}
            className="is-fullwidth button is-success "
          >
            Start
          </button>
        )}
    </div>
  );
};

export default App;
