import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';
import 'bulma/css/bulma.css';

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

enum SORT {
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

function sort(goods: string[], sortField: SORT, isReversed: boolean): string[] {
  const sortedGoods = [...goods];

  switch (sortField) {
    case SORT.ALPHABET:
      sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT.LENGTH:
      sortedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    case SORT.DEFAULT:
    default:
      break;
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SORT>(SORT.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const newGoodsFromServer = sort(goodsFromServer, sortField, isReversed);

  const reset = () => {
    setSortField(SORT.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': SORT.ALPHABET !== sortField,
          })}
          onClick={() => setSortField(SORT.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': SORT.LENGTH !== sortField,
          })}
          onClick={() => setSortField(SORT.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
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
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {newGoodsFromServer.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
