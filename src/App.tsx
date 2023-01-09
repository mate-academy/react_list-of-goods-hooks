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
  NONE,
  ALPABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

interface Good {
  name:string;
  id: string;
}

export function getReorderedGoods(
  goods: Good[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  if (!SortType.NONE) {
    visibleGoods.sort((g1, g2) => {
      switch (sortType) {
        case SortType.ALPABET:
          return g1.name.localeCompare(g2.name);

        case SortType.LENGTH:
          return g1.name.length - g2.name.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export function addId(goods: string[]): Good[] {
  return goods.map(good => ({ name: good, id: uuidv4() }));
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const sortByAlpabet = () => {
    setSortType(SortType.ALPABET);
  };

  const reverseGoods = () => {
    setReversed(current => !current);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  const visibleGoods = getReorderedGoods(
    addId(goodsFromServer),
    { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
          onClick={sortByAlpabet}
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
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortType || isReversed)
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          ) : ''}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good.id}>{good.name}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
