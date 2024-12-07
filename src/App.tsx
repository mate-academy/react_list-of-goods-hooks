import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';
import { SortType } from './enums/SortType';
import { getVisibleGoods } from './utils/getVisibleGoods';
import { VisibleGoods } from './components/VisibleGoods';

export const goodsFromServer: string[] = [
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
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const resetGoods = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const visibleGoods: string[] = getVisibleGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const shouldShowResetButton =
    sortType !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabetic)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabetic,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {shouldShowResetButton && (
          <button
            onClick={resetGoods}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <VisibleGoods visibleGoods={visibleGoods} />
    </div>
  );
};
