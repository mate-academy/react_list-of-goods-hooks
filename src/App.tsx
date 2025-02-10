import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';

import './App.scss';

export const goodsFromServer = [
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

// const SORT_FIELD_ALPH = 'alph';
// const SORT_FIELD_LENGTH = 'length';

enum SortType {
  none = '',
  alph = 'alph',
  length = 'length',
}

type Props = {
  sortField: SortType.none | SortType.alph | SortType.length;
  isReversed: boolean;
};

function getSorted(goods: string[], { sortField, isReversed }: Props) {
  const preperedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortType.alph:
        preperedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SortType.length:
        preperedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        return preperedGoods;
    }
  }

  if (isReversed) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.none);
  const [isReversed, setIsReversed] = useState(false);

  const prop: Props = {
    sortField,
    isReversed,
  };

  const visibleGoods = getSorted(goodsFromServer, prop);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alph,
          })}
          onClick={() => setSortField(SortType.alph)}
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
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(isReversed || sortField) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
