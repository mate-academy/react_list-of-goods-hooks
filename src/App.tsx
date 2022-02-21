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
  const [isStarted, setIsStarted] = useState(false);
  const [isReverse, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const start = () => setIsStarted(true);

  const reset = () => {
    setIsReversed(false);
    setSortBy('');
  };

  const reverse = () => setIsReversed(!isReverse);

  const sortByAlphabet = () => {
    setSortBy('alpha');
  };

  const sortByLength = () => {
    setSortBy('length');
  };

  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((good1, good2) => {
    switch (sortBy) {
      case 'alphabet':
        return good1.localeCompare(good2);
      case 'length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      <h1 className="title">Goods</h1>

      <div className="buttons__container">
        <button
          type="button"
          className="button is-primary"
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
          className="button is-primary"
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className="button is-primary"
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
