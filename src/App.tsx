import React, { useState } from 'react';
import cn from 'classnames';
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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort(
        (firstGood, secondGood) => firstGood.localeCompare(secondGood),
      );
      break;

    case SortType.LENGTH:
      visibleGoods.sort(
        (firstGood, secondGood) => firstGood.length - secondGood.length,
      );
      break;

    case SortType.NONE:
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const isResetVisible = isReversed || sortType !== SortType.NONE;

  const visibleGoods = getReorderedGoods(
    goodsFromServer, { isReversed, sortType },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )
          }
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )
          }
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={() => setReversed(current => !current)}
        >
          Reverse
        </button>

        {
          isResetVisible && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(SortType.NONE);
                setReversed(false);
              }}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {
          visibleGoods.map(good => (<li key={good} data-cy="Good">{`${good}`}</li>))
        }
      </ul>
    </div>
  );
};
