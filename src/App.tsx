import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodsList } from './GoodsList';

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

function changeSorting(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const newGoods = [...goods];

  if (sortType !== SortType.NONE) {
    newGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    newGoods.reverse();
  }

  return newGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversity] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const visibleGoods = changeSorting(goodsFromServer, sortType, isReversed);

  const reset = () => {
    setSortType(SortType.NONE);
    setReversity(false);
  };

  const aplabeticSort = () => setSortType(SortType.ALPHABET);
  const lengthSort = () => setSortType(SortType.LENGTH);
  const listReverse = () => setReversity(value => !value);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={aplabeticSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={lengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            {
              'is-light': isReversed === false,
            },
          )}
          onClick={listReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodsList goods={visibleGoods} />
      </ul>
    </div>
  );
};
