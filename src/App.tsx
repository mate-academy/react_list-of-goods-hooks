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

enum SortType {
  none = 'none',
  name = 'name',
  length = 'length',
}
interface Options {
  sortType:SortType,
  isReversed:boolean
}

type GetPrepareGoods = (
  goods:string[],
  {
    sortType,
    isReversed,
  }:Options) => string[];

const getPreparedGoods:GetPrepareGoods = (goods, { sortType, isReversed }) => {
  const result = [...goods];

  result.sort((g1, g2) => {
    switch (sortType) {
      case SortType.length:
        return g1.length - g2.length;

      case SortType.name:
        return g1.localeCompare(g2);

      default:
        return 0;
    }
  });

  if (isReversed) {
    result.reverse();
  }

  return result;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.none);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const reset = () => {
    setSortType(SortType.none);
    setIsReversed(false);
  };

  const conditionForReset = sortType !== SortType.none || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.name,
          })}
          onClick={() => setSortType(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.length,
          })}
          onClick={() => setSortType(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>

        {
          conditionForReset && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        <ul>
          {
            visibleGoods.map((good) => (
              <li
                data-cy="Good"
                key={good}
              >
                {good}
              </li>
            ))
          }
        </ul>
      </ul>
    </div>
  );
};
