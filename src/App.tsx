import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

import { Good } from './Good';

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

function getReorderedGoods(
  goods: string[],
  sortType: string,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case 'alphabet':
        return a.localeCompare(b);

      case 'length':
        return a.length - b.length;

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
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState('none');

  const reset = () => {
    setReversed(false);
    setSortType('none');
  };

  const reverse = () => setReversed(!isReversed);

  const sortByAlphabetically = () => setSortType('alphabet');

  const sortByLength = () => setSortType('length');

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByAlphabetically}
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== 'alphabet' },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== 'length' },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {(sortType !== 'none' || isReversed) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <Good goods={visibleGoods} />
    </div>
  );
};
