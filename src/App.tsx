import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortType';
import { GoodList } from './components/GoodList';

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
  let visibleGoods: string[] = [...goodsFromServer];

  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState(false);

  const handleReverse = () => {
    setReversed(prev => !prev);
  };

  const handleSortAlphabetically = () => {
    setSortType(SortType.Alphabetical);
  };

  const handleSortByLength = () => {
    setSortType(SortType.Length);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setReversed(false);
  };

  if (sortType === SortType.Alphabetical) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.Length) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  const isChanged = sortType !== SortType.None || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabetical,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
