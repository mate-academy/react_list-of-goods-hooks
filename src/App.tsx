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

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setType] = useState(0);
  const [isReversed, setReverse] = useState(false);
  const visibleGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button', 'is-info', sortType === 1 ? '' : 'is-light',
          )}
          onClick={() => setType(1)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-success', sortType === 2 ? '' : 'is-light',
          )}
          onClick={() => setType(2)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-warning', isReversed ? '' : 'is-light',
          )}
          onClick={() => {
            setReverse(current => !current);
          }}
        >
          Reverse
        </button>

        {(isReversed || sortType !== 0) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setType(0);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
