import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

interface Methods {
  sortField: string;
  isReversed: boolean;
}

const alphabeticallySort = 'alphabet';
const lengthSort = 'length';

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

function getPreparedItems(
  { sortField, isReversed } : Methods,
) {
  const sortedGoods = [...goodsFromServer];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case alphabeticallySort:
          return good1.localeCompare(good2);

        case lengthSort:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedItems(
    { sortField, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== alphabeticallySort,
          })}
          onClick={() => setSortField(alphabeticallySort)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== lengthSort,
          })}
          onClick={() => setSortField(lengthSort)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (

          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
