import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { getReorderedGoods } from './helpers';

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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortedList = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const resetCondition = sortType !== SortType.NONE || isReversed;

  function resetList() {
    setSortType(SortType.NONE);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': isReversed !== true,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {
          resetCondition && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => resetList()}
            >
              Reset
            </button>
          )
        }
      </div>
      <ul>
        {sortedList.map(product => (
          <li data-cy="Good" key={product}>
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
