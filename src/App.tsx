import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

interface Good {
  name: string;
  id: string;
}

const goodsFromServer: Good[] = [
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
].map(good => ({
  name: good,
  id: uuidv4(),
}));

const App: FC = () => {
  const [isShowedGoods, setShowedGoods] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [isSortBy, setSortBy] = useState('');

  const showTheGoods = () => setShowedGoods(true);

  const reverseGoods = () => setReversed(revers => !revers);

  const sortByAlphabet = () => setSortBy('alphabet');

  const sortByLength = () => setSortBy('length');

  const resetTheGoods = () => {
    setSortBy('');
    setReversed(false);
  };

  const copyGoods = [...goodsFromServer];

  copyGoods.sort((good1, good2) => {
    switch (isSortBy) {
      case 'alphabet':
        return good1.name.localeCompare(good2.name);
      case 'length':
        return good1.name.length - good2.name.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    copyGoods.reverse();
  }

  return (
    <div className="App">
      <h1>
        React list of goods
      </h1>
      {isShowedGoods
        ? (
          <ul className="goods">
            { copyGoods.map(good => (
              <li className="goods_list" key={good.id}>
                {good.name}
              </li>
            ))}
          </ul>
        )
        : (
          <button
            type="button"
            onClick={showTheGoods}
          >
            Start
          </button>
        )}
      <button
        type="button"
        onClick={reverseGoods}
      >
        Reverse
      </button>
      <button
        type="button"
        onClick={sortByAlphabet}
      >
        Sort alphabetically
      </button>
      <button
        type="button"
        onClick={sortByLength}
      >
        Sort by length
      </button>
      <button
        type="button"
        onClick={resetTheGoods}
      >
        Reset
      </button>
    </div>

  );
};

export default App;
