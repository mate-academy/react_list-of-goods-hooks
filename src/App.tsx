import { FC, useState } from 'react';
import './App.css';
import { SortableList } from './components/SortableList';

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

const App: FC = () => {
  const [isHidden, unsetHidden] = useState(true);

  return (
    <div className="app">
      <h1>Goods</h1>

      {isHidden
        ? (
          <button
            type="button"
            className="button"
            onClick={() => unsetHidden(false)}
          >
            Start
          </button>
        )
        : (
          <SortableList goods={goodsFromServer} />
        )}
    </div>
  );
};

export default App;
