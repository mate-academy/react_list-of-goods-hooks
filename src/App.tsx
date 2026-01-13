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

enum SortType {
  None = '',
  Name = 'name',
  Length = 'length',
}

function getVisibleGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] {
  const result = [...goods];

  if (sortField) {
    result.sort((good1, good2) => {
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

  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = React.useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = React.useState(false);

  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.Name
            ? 'button is-info'
            : 'button is-info is-light'
          }
          onClick={() => setSortField(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SortType.Length)}
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

        {(sortField !== SortType.None || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.None);
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
