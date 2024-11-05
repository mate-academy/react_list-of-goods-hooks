import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

enum SortType {
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

type Props<T> = {
  goods: T[];
  sortGood: SortType;
  isReversed: boolean;
};

function getPreparedGoods<T>({ goods, sortGood, isReversed }: Props<T>): T[] {
  const preparedGoods = [...goods];

  if (sortGood !== SortType.NONE) {
    preparedGoods.sort((good1, good2) => {
      let result: number;

      switch (sortGood) {
        case SortType.ALPHABET:
          result = String(good1).localeCompare(String(good2));
          break;

        case SortType.LENGTH:
          result = String(good1).length - String(good2).length;
          break;

        default:
          result = 0;
          break;
      }

      return result;
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortGood, setSortGood] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGoods({
    goods: goodsFromServer,
    sortGood,
    isReversed,
  });

  const isInitialOrder = sortGood === SortType.NONE && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortGood(SortType.ALPHABET);
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': sortGood !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortGood(SortType.LENGTH);
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': sortGood !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            onClick={() => {
              setSortGood(SortType.NONE);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
