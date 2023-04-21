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
  LENGHT,
}

type RearderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: RearderOptions,
) {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === SortType.LENGHT) {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, reverse] = useState(false);

  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const reset = () => {
    setSortType(SortType.NONE);
    reverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGHT },
          )}
          onClick={() => setSortType(SortType.LENGHT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => reverse(!isReversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={classNames(
            'button is-danger',
            { 'is-light': sortType === SortType.NONE && !isReversed },
          )}
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
