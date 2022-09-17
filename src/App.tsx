import React, { useState } from 'react';
import classNames from 'classnames';
import { GoodsList } from './components/googsList';
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

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('id');

  const copyGoods = [...goodsFromServer];

  const sortingAlphabet = () => {
    setSortBy('alphabet');
  };

  const sortingLength = () => {
    setSortBy('length');
  };

  const reverse = () => {
    setIsReversed(prevState => !prevState);
  };

  if (isReversed) {
    copyGoods.reverse();
  }

  const resetButtonHandler = () => {
    setSortBy('id');
    setIsReversed(false);
  };

  copyGoods.sort((a, b) => {
    switch (sortBy) {
      case 'alphabet':
        return a.localeCompare(b);

      case 'length':
        return a.length - b.length;

      default: return 0;
    }
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            { 'is-light': sortBy !== 'alphabet' })}
          onClick={sortingAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            { 'is-light': sortBy !== 'length' })}
          onClick={sortingLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': isReversed === false })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(isReversed || sortBy !== 'id')
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetButtonHandler}
            >
              Reset
            </button>
          )}

      </div>

      <GoodsList goods={copyGoods} />
    </div>
  );
};
