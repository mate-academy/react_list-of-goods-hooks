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
  byAlphabet = 'byAlphabet',
  byLength = 'byLength',
  byDefault = 'byDefault',
}

const getPreparedGoods = (
  goods: string[],
  sortField?: SortType | undefined,
  reverse?: boolean,
) => {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortType.byAlphabet:
        preparedGoods.sort((el1, el2) => el1.localeCompare(el2));
        break;
      case SortType.byLength:
        preparedGoods.sort((el1, el2) => el1.length - el2.length);
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
  const [sortField, setSortField] = useState<SortType | undefined>(undefined);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reverse);
  const isReset = sortField || reverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.byAlphabet,
          })}
          onClick={() => setSortField(SortType.byAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.byLength,
          })}
          onClick={() => setSortField(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(undefined);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good: string, index: number) => (
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
