import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
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

enum SortType {
  by_alphabet = 'alphabetically',
  by_length = 'length',
}

interface Queries {
  sortedField: SortType | '',
  isReverse: boolean,
}

const getPreparedGoods = (
  goods: string[],
  { sortedField, isReverse } : Queries,
) => {
  const preparedGoods = [...goods];

  if (sortedField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortedField) {
        case SortType.by_alphabet:
          return good1.localeCompare(good2);

        case SortType.by_length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortedField, setSortedField] = useState<SortType | ''>('');
  const [isReverse, setIsReverse] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, { sortedField, isReverse });

  const sortByAlphabet = () => {
    setSortedField(SortType.by_alphabet);
  };

  const sortByLength = () => {
    setSortedField(SortType.by_length);
  };

  const reset = () => {
    setSortedField('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortedField !== SortType.by_alphabet },
          )}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortedField !== SortType.by_length },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReverse },
          )}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(isReverse || sortedField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
