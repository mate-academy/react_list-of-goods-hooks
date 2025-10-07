import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortType';
import { GoodList } from './components/GoodList';

const goodsFromServer: string[] = [
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
  const [isReversed, setIsReversed] = useState(false);

  const getButtonClass = (base: string, isActive: boolean) =>
    `button ${base}${isActive ? ' is-selected' : ' is-light'}`;

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleSortAlphabetically = () => {
    setSortType(SortType.Alphabetical);
  };

  const handleSortByLength = () => {
    setSortType(SortType.Length);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  let visibleGoods = [...goodsFromServer];

  if (sortType === SortType.Alphabetical) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.Length) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const hasChanges = sortType !== SortType.None || isReversed;

  return (
    <section className="section content">
      <h1 className="title is-3 has-text-centered">List of Goods</h1>

      <div className="buttons is-centered">
        <button
          type="button"
          className={getButtonClass(
            'is-info',
            sortType === SortType.Alphabetical,
          )}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass(
            'is-success',
            sortType === SortType.Length,
          )}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass('is-warning', isReversed)}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {hasChanges && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </section>
  );
};
