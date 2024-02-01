import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer: Goods = [
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

enum SortType {
  alphabetically = 'Sort alphabetically',
  length = 'Sort by length',
  default = '',
}

const getGoods = ((goods: Goods, sortType: SortType) => {
  const resultGoods = [...goods];

  if (sortType) {
    resultGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.alphabetically:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return resultGoods;
});

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortedGoods = getGoods(goodsFromServer, sortType);
  const visibleGoods = isReversed ? sortedGoods.reverse() : sortedGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button is-info',
              { 'is-light': sortType !== SortType.alphabetically },
            )
          }
          onClick={() => setSortType(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-success',
              { 'is-light': sortType !== SortType.length },
            )
          }
          onClick={() => setSortType(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {
          (sortType || isReversed) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(SortType.default);
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
