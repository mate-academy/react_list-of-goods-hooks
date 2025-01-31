import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

enum SortBy {
  sortByAlphabet = 'alphabet',
  sortByLength = 'length',
}

type Parameters = {
  sortField: SortBy | '';
  reversed: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortField, reversed }: Parameters,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortBy.sortByAlphabet:
          return good1.localeCompare(good2);

        case SortBy.sortByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortBy | ''>('');
  const [reversed, setReversed] = useState(false);

  const isModified = sortField !== '' || reversed;

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortBy.sortByAlphabet ? '' : 'is-light'}`}
          onClick={() => setSortField(SortBy.sortByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortBy.sortByLength ? '' : 'is-light'}`}
          onClick={() => setSortField(SortBy.sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed === true ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      {visibleGoods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </div>
  );
};
