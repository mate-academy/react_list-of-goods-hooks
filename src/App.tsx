import React, { useState } from 'react';
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

export enum SortType {
  NONE = 'none',
  ALPHABETICALLY = 'alphabetically',
  BY_LENGTH = 'by_length',
}

export const App: React.FC = () => {
  const [sortList, setSortList] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortList) {
      case SortType.ALPHABETICALLY:
        return good1.localeCompare(good2);
      case SortType.BY_LENGTH:
        return good1.length - good2.length;
      case SortType.NONE:
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isModified = sortList !== SortType.NONE || isReversed !== false;

  const sortingButtons = [
    { type: SortType.ALPHABETICALLY, label: 'Sort alphabetically' },
    { type: SortType.BY_LENGTH, label: 'Sort by length' },
  ];

  return (
    <div className="section content">
      <div className="buttons">
        {sortingButtons.map(({ type, label }) => (
          <button
            type="button"
            key={type}
            className={
              type === sortList ? 'button is-info' : 'button is-info is-light'
            }
            onClick={() => setSortList(type)}
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          className={isReversed ? 'button is-info' : 'button is-info is-light'}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              setSortList(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
