import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

type Goods = string[];

enum Sorts {
  sortAlphabetically = 'letters',
  sortFieldByLength = 'length',
}

function getPreparedGoods(
  goods: Goods,
  sortType: string,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((a, b) => {
      switch (sortType) {
        case Sorts.sortAlphabetically:
          return a.localeCompare(b);
        case Sorts.sortFieldByLength:
          return a.length - b.length;
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
  const [sortType, setSortType] = useState('');
  const [isListReversed, setIsListReversed] = useState(false);
  const sortedGoods = getPreparedGoods(
    goodsFromServer,
    sortType,
    isListReversed,
  );
  const CONDITION_FIELD = sortType || isListReversed;

  function handlerResetClick() {
    setSortType('');
    setIsListReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(Sorts.sortAlphabetically)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== Sorts.sortAlphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(Sorts.sortFieldByLength)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== Sorts.sortFieldByLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsListReversed(!isListReversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isListReversed,
          })}
        >
          Reverse
        </button>

        {CONDITION_FIELD && (
          <button
            onClick={() => handlerResetClick()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {sortedGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
