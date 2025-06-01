import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

enum SortBy {
  Default = 'default',
  Alph = 'alph',
  Length = 'length',
}

type Good = string;

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
];

export const App = () => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Default);
  const [wasReversed, setWasReversed] = useState(false);

  const handleSort = (type: SortBy) => {
    setSortBy(type);
  };

  const toggleReverse = () => {
    setWasReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortBy(SortBy.Default);
    setWasReversed(false);
  };

  const getSortedGoods = () => {
    const goods = [...goodsFromServer];

    if (sortBy === SortBy.Alph) {
      goods.sort((a, b) => a.localeCompare(b));
    } else if (sortBy === SortBy.Length) {
      goods.sort((a, b) => a.length - b.length);
    }

    if (wasReversed) {
      goods.reverse();
    }

    return goods;
  };

  const goods = getSortedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort(SortBy.Alph)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortBy.Alph,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort(SortBy.Length)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortBy.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={cn('button is-info', {
            'is-light': !wasReversed,
          })}
        >
          Reverse
        </button>

        {(sortBy !== SortBy.Default || wasReversed) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-info"
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
