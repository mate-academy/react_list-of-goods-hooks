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
  Default,
  Alphabet,
  Length,
}

function getPreparedGood(
  goods: string[],
  sortField: SortType,
  reverseField: boolean,
) {
  const preparedGood = [...goods];

  if (sortField) {
    preparedGood.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGood.reverse();
  }

  return preparedGood;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPreparedGood(
    goodsFromServer,
    sortField,
    reverseField,
  );

  const handleSortAlphabet = () => {
    setSortField(SortType.Alphabet);
  };

  const handleSortLength = () => {
    setSortField(SortType.Length);
  };

  const handleSortReverse = () => {
    setReverseField(prev => !prev);
  };

  const handleSortReset = () => {
    setSortField(SortType.Default);
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortAlphabet}
          className={cn('button  is-info ', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortLength}
          className={cn('button  is-success ', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        {/* для кнопки реверс встановив пермикач зміни стану(true-false, це toogle кнопка) */}
        <button
          type="button"
          onClick={handleSortReverse}
          className={cn('button  is-warning ', {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>
        {(sortField || reverseField) && (
          <button
            type="button"
            onClick={handleSortReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
