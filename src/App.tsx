import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

type SortType = 'alphabetically' | 'length' | null;

export const App = (): React.FC => {
  const [sortType, setSortType] = useState<SortType>(null);
  const [isReversed, setIsReversed] = useState(false);

  const getGoods = (): string[] => {
    const goods = [...goodsFromServer];

    if (sortType === 'alphabetically') {
      goods.sort();
    }

    if (sortType === 'length') {
      goods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  };

  const handleSortAlphabetically = () => {
    setSortType('alphabetically');
  };

  const handleSortByLength = () => {
    setSortType('length');
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  const goods = getGoods();

  const isOriginalOrder = sortType === null && isReversed === false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
