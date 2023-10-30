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
  alphabet = 'alphabet',
  length = 'length',
}

interface SortParms {
  sortField: string,
  reverseField: boolean,
}

function getPrepearedGoods(
  goods: string[],
  { sortField, reverseField }: SortParms,
) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.alphabet:
          return good1.localeCompare(good2);

        case SortField.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPrepearedGoods(
    goodsFromServer, { sortField, reverseField },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortField.alphabet)}
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SortField.alphabet })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortField.length)}
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SortField.length })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !reverseField })}
        >
          Reverse
        </button>

        {
          (sortField || reverseField) && (
            <button
              onClick={() => {
                setReverseField(false);
                setSortField('');
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
