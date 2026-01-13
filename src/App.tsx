import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './Goodlist';

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
  None = '',
  Name = 'name',
  Length = 'length',
}

function getVisibleGoods(
  goods: string[],
  sortField: SortField,
  isReversed: boolean,
): string[] {
  const result = [...goods];

  if (sortField) {
    result.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Length:
          return good1.length - good2.length;
        case SortField.Name:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = React.useState<SortField>(SortField.None);
  const [isReversed, setIsReversed] = React.useState(false);

  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === 'name' ? 'button is-info' : 'button is-info is-light'
          }
          onClick={() => setSortField(SortField.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SortField.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortField.None);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
