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
enum SortType {
  Default = 'onlystarted',
  Alphabet = 'alphabet',
  Length = 'length',
}

interface SortingParams {
  goods: string[];
  field: SortType;
  reversed: boolean;
}

function getSortedGoods({ goods, field, reversed }: SortingParams) {
  const prepared = [...goods];

  if (field === SortType.Alphabet) {
    prepared.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (field === SortType.Length) {
    prepared.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    prepared.reverse();
  }

  return prepared;
}

export const App: React.FC = () => {
  const [field, setField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  function reset() {
    setField(SortType.Default);
    setIsReversed(false);
  }

  const sortedGoods = getSortedGoods({
    goods: goodsFromServer,
    field,
    reversed: isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': field !== SortType.Alphabet,
          })}
          onClick={() => setField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': field !== SortType.Length,
          })}
          onClick={() => setField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(field !== SortType.Default || isReversed) && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
