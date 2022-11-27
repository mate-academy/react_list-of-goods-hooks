import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

  visibleGoods.sort((firstGood, secondGood) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return firstGood.localeCompare(secondGood);

      case SortType.LENGTH:
        return firstGood.length - secondGood.length;

      case SortType.NONE:
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const isOrderChanged = isReversed || sortType !== SortType.NONE;

  const orderedGoods = getReorderedGoods(
    goodsFromServer,
    {
      isReversed,
      sortType,
    },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={(() => setSortType(SortType.ALPHABET))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={(() => setSortType(SortType.LENGTH))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {isOrderChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setSortType(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {orderedGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
