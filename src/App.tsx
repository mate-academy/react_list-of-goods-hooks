import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer: string[] = [
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

enum SortBy {
  Alphabet = 'Alphabet',
  Length = 'Length',
  Reverse = 'Reverse',
  Default = '',
}

function getSortedPeople(
  goods: string[],
  sort: SortBy,
  reverse: SortBy | boolean,
): string[] {
  let visibleGoods: string[] = [...goods];

  switch (sort) {
    case SortBy.Alphabet:
      visibleGoods = visibleGoods.sort((
        good1: string, good2: string,
      ) => good1.localeCompare(good2));
      break;
    case SortBy.Length:
      visibleGoods = visibleGoods.sort((
        good1: string, good2: string,
      ) => good1.length - good2.length);
      break;
    default:
      visibleGoods = [...goodsFromServer];
      break;
  }

  if (reverse) {
    visibleGoods = visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortBy>(SortBy.Default);
  const [reverseField, setReverseField] = useState<SortBy | boolean>(false);

  const sortedPeople = getSortedPeople(
    goodsFromServer,
    sortField,
    reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortBy.Alphabet })}
          onClick={() => setSortField(SortBy.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortBy.Length })}
          onClick={() => setSortField(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': reverseField !== SortBy.Reverse })}
          onClick={() => setReverseField(reverseField === SortBy.Reverse
            ? false
            : SortBy.Reverse)}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortBy.Default);
              setReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedPeople.map((good: string) => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
