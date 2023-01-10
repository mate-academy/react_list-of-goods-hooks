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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((name1, name2) => (
        name1.localeCompare(name2)
      ));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((product1, product2) => (
        product1.length - product2.length
      ));
      break;

    case SortType.NONE:
      break;

    default: break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleClickDoSortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleClickDoSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleClickDoReverse = () => {
    setIsReversed(current => !current);
  };

  const handleClickDoReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
            pulse: sortType === SortType.ALPHABET,
          })}
          onClick={handleClickDoSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
            pulse: sortType === SortType.LENGTH,
          })}
          onClick={handleClickDoSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
            pulse: isReversed,
          })}
          onClick={handleClickDoReverse}
        >
          Reverse
        </button>

        {sortType !== SortType.NONE || isReversed
          ? (
            <button
              type="button"
              className="button is-danger"
              onClick={handleClickDoReset}
            >
              Reset
            </button>
          )
          : ''}
      </div>

      <div>
        <ul>
          {
            getReorderedGoods(goodsFromServer, { sortType, isReversed })
              .map((product) => (
                <li
                  data-cy="Good"
                  key={product}
                >
                  {product}
                </li>
              ))
          }
        </ul>
      </div>
    </div>
  );
};
