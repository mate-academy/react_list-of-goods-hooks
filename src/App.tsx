import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodList } from './components/goods';

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
  NONE = 'id',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.NONE);

  const Goods = [...goodsFromServer];

  const sortByAlphabet = () => {
    setSortBy(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortBy(SortType.LENGTH);
  };

  const reset = () => {
    setSortBy(SortType.NONE);
    setIsReversed(false);
  };

  Goods.sort((a, b) => {
    switch (sortBy) {
      case SortType.LENGTH:
        return a.length - b.length;

      case SortType.ALPHABET:
        return a.localeCompare(b);

      default: return 0;
    }
  });

  if (isReversed) {
    Goods.reverse();
  }

  const reverse = () => {
    setIsReversed(prevState => !prevState);
  };

  return (
    <div className="section content">
      <div className="buttons">

        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortBy !== 'alphabet' },
          )}
          onClick={sortByAlphabet}

        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortBy !== 'length' },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            {
              'is-light': isReversed === false,
            },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        { (isReversed || sortBy !== 'id')
        && (
          <button
            type="button"
            className="button btn-reset is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={Goods} />
    </div>
  );
};
