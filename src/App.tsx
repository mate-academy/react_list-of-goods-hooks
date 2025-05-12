import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export enum SortType {
  None = 'None',
  Alphabetically = 'Alphabetically',
  ByLength = 'ByLength',
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  switch (sortType) {
    case SortType.Alphabetically:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.ByLength:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

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

const GoodItem: React.FC<{ good: string }> = ({ good }) => (
  <li data-cy="Good">{good}</li>
);

const GoodList: React.FC<{ goods: string[] }> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodItem good={good} key={good} />
    ))}
  </ul>
);

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const preparedGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabetically)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.ByLength)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversed) && (
          <button
            onClick={() => {
              setSortType(SortType.None);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={preparedGoods} />
    </div>
  );
};
