import React, { useState } from 'react';
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
  Alphabet = 'byAlphabet',
  Length = 'byLength',
  Default = 'byDefault',
}

const getPreparedGoods = (
  goods: string[],
  sortField?: SortType | null,
  reverse?: boolean,
) => {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortType.Alphabet:
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Length:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | null>(null);
  const [isReverse, setIsReverse] = useState(false);

  const preparedGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);
  const isReset = sortField || isReverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(null);
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map((good: string) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
