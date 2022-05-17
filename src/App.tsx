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
  const [visibility, setVisibility] = useState(true);

  return (
    <div className="app">
      <h1>Goods</h1>

      {visibility
        ? (
          <button
            type="button"
            className="button"
            onClick={() => setVisibility(false)}
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
