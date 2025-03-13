import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './Components/GoodsList';

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
  DEFAULT = '',
  SORT_ALPHABETICALLY = 'alphabetically',
  SORT_LENGTH = 'length',
}

type Prop = {
  sortField: SortType;
  reversed: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortField, reversed }: Prop,
): string[] {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1: string, good2: string) => {
    switch (sortField) {
      case SortType.SORT_ALPHABETICALLY:
        return good1.localeCompare(good2);
      case SortType.SORT_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [reversed, setReversed] = useState(false);
  const visibleGoods: string[] = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.SORT_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {sortField || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        <GoodsList items={visibleGoods} />
      </ul>
    </div>
  );
};
