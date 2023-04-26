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

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);
      case SortType.LENGHT:
        return good1.length - good2.length;
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
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverseSate] = useState(false);

  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const reset = () => {
    setSortType(SortType.NONE);
    setReverseSate(false);
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
          onClick={() => setReverseSate(!isReversed)}
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
        {goods.map(good => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
