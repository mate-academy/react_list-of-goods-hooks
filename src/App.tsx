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
  Default = '',
  Name = 'name',
  Length = 'length',
}

function getPreparedGoods(
  goods: string[],
  [sortField, reversedField]: [SortType, boolean],
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Length:
          return good1.length - good2.length;

        case SortType.Name:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reversedField) {
    preparedGoods = [...preparedGoods].reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reversedField, setReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, [
    sortField,
    reversedField,
  ]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.Name)}
          className={cn('button', {
            'is-light': sortField !== SortType.Name,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.Length)}
          className={cn('button', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(prev => !prev)}
          className={cn('button', { 'is-light': !reversedField })}
        >
          Reverse
        </button>

        {(sortField !== '' || reversedField) && (
          <button
            type="button"
            onClick={() => {
              setSortField(SortType.Default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

/*export const App: React.FC = () => {
  return (
    <div className="section content">
      <div className="buttons">
        <button type="button" className="button is-info is-light">
          Sort alphabetically
        </button>

        <button type="button" className="button is-success is-light">
          Sort by length
        </button>

        <button type="button" className="button is-warning is-light">
          Reverse
        </button>

        <button type="button" className="button is-danger is-light">
          Reset
        </button>
      </div>

      <ul>
        <ul>
          <li data-cy="Good">Dumplings</li>
          <li data-cy="Good">Carrot</li>
          <li data-cy="Good">Eggs</li>
          <li data-cy="Good">Ice cream</li>
          <li data-cy="Good">Apple</li>
          <li data-cy="Good">...</li>
        </ul>
      </ul>
    </div>
  );
};*/
