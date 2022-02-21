import { useState } from 'react';
import './App.css';
import { GoodList } from './components/GoodList/GoodList';

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
  const [isStarted, setStarted] = useState(false);
  const [isReverse, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const start = () => setStarted(true);

  const reset = () => {
    setReversed(false);
    setSortBy('');
  };

  const reverse = () => setReversed(!isReverse);

  const sortByAlpha = () => {
    setSortBy('alpha');
  };

  const sortByLength = () => {
    setSortBy('length');
  };

  const visibleGoods = [...goodsFromServer];
  const buttonClass = 'button is-primary';

  switch (sortBy) {
    case 'alpha':
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case 'length':
      visibleGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      <h1 className="title">Goods</h1>

      <div className="buttons__container">
        <button
          type="button"
          className={isReverse
            ? `${buttonClass} is-active`
            : `${buttonClass}`}
          onClick={reverse}
        >
          Reverse
        </button>
        <button
          type="button"
          className="button is-primary"
          onClick={reset}
        >
          Reset
        </button>
        <button
          type="button"
          className={sortBy
            ? `${buttonClass} is-active`
            : `${buttonClass}`}
          onClick={sortByAlpha}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={sortBy
            ? `${buttonClass} is-active`
            : `${buttonClass}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>
      </div>

      {isStarted ? (
        <GoodList goods={visibleGoods} />
      ) : (
        <div className="button__container">
          <button
            type="button"
            className="button-start"
            onClick={start}
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
