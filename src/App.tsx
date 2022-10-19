import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { v4 as uuidv4 } from 'uuid';
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
  NONE = 'NONE',
  ALPHABET = 'ALPHABET',
  LENGTH = 'LENGTH',
}

export function getReorderedGoods(
  goods: string[],
  sortType: SortType, isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((goodsA: string, goodsB: string) => {
    switch (sortType) {
      case SortType.LENGTH:
        return goodsA.length - goodsB.length;
      case SortType.ALPHABET:
        return goodsA.localeCompare(goodsB);
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const sortyByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const reorderedGoods
  = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortyByAlphabet}
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverse}
        >
          Reverse
        </button>
        {(sortType !== SortType.NONE || isReversed)
        && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        <ul>
          {reorderedGoods.map(good => (
            <li key={uuidv4()} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
