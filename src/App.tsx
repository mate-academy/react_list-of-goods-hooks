import { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

enum SortType {
  none = 'none',
  alphabet = 'alphabet',
  length = 'length',
}

const goodsFromServer = [
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

function getPrepearedGood(
  goods: string[],
  sortField: SortType | null,
  isReversed = false,
): string[] {
  const prepearedGoods = [...goods];

  if (sortField === SortType.alphabet) {
    prepearedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortField === SortType.length) {
    prepearedGoods.sort((a, b) => a.length - b.length);
  }

  return isReversed ? prepearedGoods.reverse() : prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.none);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPrepearedGood(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alphabet,
          })}
          onClick={() => setSortField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField !== SortType.none || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.none);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
