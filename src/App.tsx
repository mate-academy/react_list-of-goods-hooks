import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';
import { SortType } from './types/SortType';

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
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState(false);

  const handleReset = () => {
    setSortType(SortType.Default);
    setReversed(false);
  };

  let visibleGoods = goodsFromServer;

  switch (sortType) {
    case SortType.Alphabetically:
      visibleGoods = visibleGoods.toSorted();
      break;

    case SortType.Length:
      visibleGoods = visibleGoods.toSorted(
        (good1, good2) => good1.length - good2.length,
      );
      break;

    default:
  }

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {(sortType !== SortType.Default || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods?.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
