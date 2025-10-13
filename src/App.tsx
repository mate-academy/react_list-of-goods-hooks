import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { SortType } from './types/SortType';
import { GoodList } from './components/GoodList';

type Goods = string[];

export const goodsFromServer: Goods = [
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
  const visibleGoods: Goods = [...goodsFromServer];

  const [reversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.None);

  const handleSortByAlphabet = () => {
    setSortType(SortType.Alphabet);
  };

  const handleSortByLength = () => {
    setSortType(SortType.Length);
  };

  const handleReverse = () => {
    setReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setReversed(false);
  };

  if (sortType === SortType.Alphabet) {
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
            'is-light': sortType !== SortType.Alphabet,
          })}
          onClick={handleSortByAlphabet}
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
