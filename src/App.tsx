import React from 'react';
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
  Default = '',
  Alphabetically = 'alphabetically',
  ByLength = 'length',
}

function getSortedGoods(
  goods: string[],
  sortField: SortType,
  isToReverse: boolean,
): string[] {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        case SortType.ByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isToReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = React.useState<SortType>(SortType.Default);
  const [reverseField, setReverseField] = React.useState(false);
  const readyGoods = getSortedGoods(goodsFromServer, sortField, reverseField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${sortField === SortType.Alphabetically ? '' : ' is-light'}`}
          onClick={() => setSortField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${sortField === SortType.ByLength ? '' : ' is-light'}`}
          onClick={() => setSortField(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${reverseField === true ? '' : ' is-light'}`}
          onClick={() => setReverseField(!reverseField)}
        >
          Reverse
        </button>

        {sortField === '' && reverseField === false ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.Default);
              setReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {readyGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
