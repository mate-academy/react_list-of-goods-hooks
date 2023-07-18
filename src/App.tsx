import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

enum SortField {
  ALPHABETICALLY = 'ALPHABETICALLY',
  LENGTH = 'LENGTH',
}

function sortBy(
  goods:string[],
  sortField:SortField | undefined,
  isReversed:boolean,
) {
  const goodsArray = [...goods];

  if (sortField) {
    goodsArray.sort((a, b) => {
      switch (sortField) {
        case SortField.ALPHABETICALLY:
          return a.localeCompare(b);

        case SortField.LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    goodsArray.reverse();
  }

  return goodsArray;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>();
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = sortBy(goodsFromServer, sortField, isReversed);

  const handleReset = () => {
    setIsReversed(false);
    setSortField(undefined);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortField.ALPHABETICALLY)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortField.LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.LENGTH,
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

        {(sortField || isReversed) && (
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
        {sortedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
