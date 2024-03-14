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

enum SortType {
  alphabetical = 'alphabetical',
  length = 'length',
}

function getPrepareGoods(
  goods: string[],
  field: string,
  reversed: boolean,
): string[] {
  let prepareGoods = [...goods];

  if (field === SortType.alphabetical) {
    prepareGoods.sort((a: string, b: string) => a.localeCompare(b));
  } else if (field === SortType.length) {
    prepareGoods.sort((a: string, b: string) => a.length - b.length);
  }

  if (reversed) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReversed] = useState(false);

  const updatedGoods = getPrepareGoods(goodsFromServer, sortField, isReverse);

  const handleclick = (field: string) => {
    if (field === sortField) {
      setIsReversed(!isReverse);
      setSortField(field);
    }
    setSortField(field);
  };

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alphabetical,
          })}
          onClick={() => handleclick(SortType.alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => handleclick(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReverse })}
          onClick={() => setIsReversed(!isReverse)}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
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
        {updatedGoods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
