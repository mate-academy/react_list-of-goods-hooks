import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import Goods from './components/goods';
import { getReorderedGoods } from './getReorderedGoods';
import { SortType } from './enums/sortType';

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
  const [sortType, setType] = useState(SortType.NONE);
  const [isReversed, setReversed] = useState(false);

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button', 'is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => setType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => setType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(reversed => !reversed)}
          type="button"
          className={classNames(
            'button', 'is-warning',
            {
              'is-light': isReversed !== true,
            },
          )}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setReversed(false);
                setType(SortType.NONE);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <Goods goods={reorderedGoods} />
    </div>
  );
};
