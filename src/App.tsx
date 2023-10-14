import React, { useState } from 'react';
import cn from 'classnames';
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

enum SortField {
  Default = 'none',
  Name = 'name',
  Length = 'length',
}

interface FilterParaments {
  sortField: SortField;
  isReversed: boolean;
}

function getPrepareGoods(
  goods: string[],
  { sortField, isReversed }: FilterParaments,
): string[] {
  const prepareGoods = [...goods];

  if (sortField !== SortField.Default) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Name:
          return good1.localeCompare(good2);

        case SortField.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? prepareGoods.reverse() : prepareGoods;
}

const sortButtons = [
  { name: 'Sort alphabetically', className: 'is-info', change: SortField.Name },
  { name: 'Sort by length', className: 'is-success', change: SortField.Length },
];

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPrepareGoods(
    goodsFromServer,
    { sortField, isReversed },
  );

  const onReverseClick = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsReversed(false);
    setSortField(SortField.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {sortButtons.map(({ name, className, change }) => (
          <button
            key={name}
            type="button"
            className={cn('button', `${className}`, { 'is-light': sortField !== change })}
            onClick={() => setSortField(change)}
          >
            {name}
          </button>
        ))}

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={onReverseClick}
        >
          Reverse
        </button>
        {(sortField !== SortField.Default || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li data-cy="Good" key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
