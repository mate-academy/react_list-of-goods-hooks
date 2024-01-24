import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortTypes {
  SORT_FIELD_ALPHABET = 'ab',
  SORT_FIELD_LENGTH = 'length',
  REVERS_FIELDS = 'fields'
};

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


function getPreperedGoods(goods: string[], sortMethod: SortTypes | string, sortDirection: SortTypes | string): string[] {
  const preperedGoods = [...goods];

  if (sortMethod) {
    preperedGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case SortTypes.SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SortTypes.SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (sortDirection) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}



export const App: React.FC = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const visibleGoods: string[] = getPreperedGoods(
    goodsFromServer,
    sortMethod,
    sortDirection,
  );

  function setResetData() {
    setSortMethod('');
    setSortDirection('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames('button is-info', {
              'is-light': sortMethod !== SortTypes.SORT_FIELD_ALPHABET,
            })
          }
          onClick={() => setSortMethod(SortTypes.SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames('button is-success', {
              'is-light': sortMethod !== SortTypes.SORT_FIELD_LENGTH,
            })
          }
          onClick={() => setSortMethod(SortTypes.SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames('button is-warning', {
              'is-light': sortDirection !== SortTypes.REVERS_FIELDS,
            })
          }
          onClick={
            () => setSortDirection(sortDirection === '' ? SortTypes.REVERS_FIELDS : '')
          }
        >
          Reverse
        </button>

        <button
          type="button"
          className={
            classNames('button is-info is-light', {
              'is-hidden': (sortMethod === '' && sortDirection === ''),
            })
          }
          onClick={setResetData}
        >
          Reset
        </button>
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
