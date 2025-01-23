import 'bulma/css/bulma.css';
import './App.scss';
import React, { useCallback, useState } from 'react';
import classNames from 'classnames';

export const goodsFromServer: Goods[] = [
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

type Goods =
  | 'Dumplings'
  | 'Carrot'
  | 'Eggs'
  | 'Ice cream'
  | 'Apple'
  | 'Bread'
  | 'Fish'
  | 'Honey'
  | 'Jam'
  | 'Garlic';

enum SortType {
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGoods(
  goods: Goods[],
  field: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (field) {
    preparedGoods.sort((good1, good2) => {
      switch (field) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [field, setField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, field, isReversed);
  const reset = useCallback(() => {
    setField(SortType.None);
    setIsReversed(false);
  }, []);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setField(SortType.Alphabet)}
          type="button"
          className={classNames('button is-info', {
            'is-light': field !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setField(SortType.Length)}
          type="button"
          className={classNames('button is-success', {
            'is-light': field !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(field || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
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
