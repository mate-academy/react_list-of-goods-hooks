import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import goodsFromServer from './data/goodsFromServer.json';
import { SortType } from './types/SortType';
import { getReorderedGoods } from './functions/getReorderedGoods';

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const goodsList = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const handleAlphabetSort = () => setSortType(SortType.ALPHABET);
  const handleLengthSort = () => setSortType(SortType.LENGTH);
  const handleReversion = () => setIsReversed(current => !current);
  const handleResetting = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleAlphabetSort}
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleLengthSort}
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReversion}
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            onClick={handleResetting}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goodsList.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
