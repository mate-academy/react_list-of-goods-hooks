import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  BY_DEFAULT = '',
  BY_ALPHABET = 'name',
  BY_LENGTH = 'name.length',
}

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

function getSortGoods(
  goods: string[],
  sortField: SortType,
  reverseField: boolean,
) {
  const listOfGoods = [...goods];

  if (sortField) {
    listOfGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.BY_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    listOfGoods.reverse();
  }

  return listOfGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.BY_DEFAULT);
  const [reverseField, setReverseField] = useState(false);

  const visibleGoods = getSortGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.BY_ALPHABET)}
          className={
            classNames(
              'button is-info',
              { 'is-light': sortField !== SortType.BY_ALPHABET },
            )
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.BY_LENGTH)}
          className={
            classNames(
              'button is-success',
              { 'is-light': sortField !== SortType.BY_LENGTH },
            )
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseField(reverse => !reverse)}
          className={
            classNames(
              'button is-warning',
              { 'is-light': !reverseField },
            )
          }
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={() => {
              setReverseField(false);
              setSortField(SortType.BY_DEFAULT);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

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
    </div>
  );
};
